import path from "path"
import fs from "fs"
import { addMailGroup, MailSegments } from "./";
import { https, Result } from "helpers";
import { MagicStrings } from "../../consts";
import { PowerShellService } from "services/powershellServer";
import { logError, logInfo, logVerbose } from "helpers/logging";
import { isJsxAttribute } from "typescript";
import { SessionStatus } from "domain/session";

export const x = 1

function load(filePath): MailSegments.Parsed {

    var fileData = fs.readFileSync(filePath)
    var segments = JSON.parse(fileData.toString())
    return segments
}

export module AddressBook {
    export interface GroupLookupProps {
        name: string;
        mail: string;
        alias: string;
        guid: string;
    }
}

type GroupMap = Map<string, AddressBook.GroupLookupProps>

const token = process.env.NEXT_PUBLIC_TESTTOKEN
/**
 * 
 *  This is an expensive function to call , so we cache the result on the server making the dataset up to 1 hour old
 * 
 * @returns a map of all the groups in the exchange server
 */
export function loadGroupAliasMap(): Promise<GroupMap> {
    return new Promise(async (resolve, reject) => {

        var groupLookupResult = await https<AddressBook.GroupLookupProps[]>(token, "GET", process.env.POWERSHELLSERVER + "/api/mailgroups")
        if ((groupLookupResult).hasError) {
            reject((groupLookupResult).errorMessage)
            return
        }
        var map: GroupMap = new Map<string, AddressBook.GroupLookupProps>()
        groupLookupResult.data.forEach(group => {
            map.set(group.alias, group)
        })
        resolve(map)

    })

}

export function findMissingDistributionLists(segments: MailSegments.Parsed, map: GroupMap, segmentName,prefix:string,statusWriter:SessionStatus.Writer): MailSegments.Value[] {

    var segmentsMissingInExchange: MailSegments.Value[] = []
    if (statusWriter) statusWriter.addStep("Finding Missing Distribution Lists")
    segments.results.onSheetLoaded.segments.forEach(segment => {
        if (segmentName && (segment.name.toLowerCase() !== segmentName.toLowerCase())) {
            return
        }
        segment.values.forEach(group => {
            if (!group.key) return

            if (map.has(prefix + group.keyHash)) {
                //if (statusWriter) statusWriter.log("Existings group", group.key)
                //logVerbose("Existings group", group.key)
                
            } else {
                segmentsMissingInExchange.push(group)
                if (statusWriter) statusWriter.log("Missing group", group.key)
                logInfo("Missing group", group.key)
            }

        })
    })
    return segmentsMissingInExchange
}


const createDistributionLists = (segments: MailSegments.Value[], testing: boolean,prefix:string,statusWriter:SessionStatus.Writer): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        var pending = 0
        var values = [...segments]
        if (statusWriter){
        values.forEach(missingGroup=>{
                statusWriter.addStep(missingGroup.key)
            })
        }
        while (values.length > 0) {

            var value = values.pop()
            logInfo("Creating Mail group " + value.key)
            //  So much can go wrong here, so it doesn't work this time, it should the next ...
            if (!testing) {
                await PowerShellService.addMailGroup(token, prefix + value.keyHash, value.key, MagicStrings.BatchPrefixSyncDL)
            }
        }
        resolve(true)
    })
}




export function syncMembers(segments: MailSegments.Parsed, testing: boolean, segmentName: string,prefix:string,statusWriter:SessionStatus.Writer): Promise<boolean> {

    var values: MailSegments.Value[] = []
    statusWriter.addStage("Syncronize members")
    segments.results.onSheetLoaded.segments.forEach(segment => {
        if (segmentName && (segment.name.toLowerCase() !== segmentName.toLowerCase())) {
            return
        }

            
        statusWriter.addJob(segment.name)

        //if (segment.name !== "Countries") return
        segment.values.forEach(group => {
            if (!group.key) return

            statusWriter.addStep(group.key)

            values.push(group)


        })
    })


    


    return new Promise((resolve, reject) => {
        if (testing) {
            resolve(true)
            return
    
        }

        const next = async () => {
            if (values.length === 0) {
                resolve(true)
                return
            }
            var value = values.pop()
            logInfo("Resolving recipients for: " + value.key)

            var missingRecipients = await PowerShellService.findMissingRecipients(token, value.values)
            logInfo(missingRecipients.data.length.toString(), "missing")
            var newRecipients: string[] = []
            if ((missingRecipients.data.length) > 0) {
                for (let index = 0; index < missingRecipients.data.length; index++) {
                    const email = missingRecipients.data[index];
                    var ownDomain = process.env.OWNDOMAIN
                    var skip = false
                    if (ownDomain && email.toLowerCase().indexOf(ownDomain.toLowerCase()) > -1) {
                        logInfo("Missing email is from own domain, most likely an employee no longer hired")
                        skip = true
                    }
                    if (!skip) {
                        logInfo("Creating recipient", email)
                        var createRecipientRequest = await PowerShellService.createRecipient(token, email)
                        if (createRecipientRequest.hasError) {
                            logError("Error creating recipient", createRecipientRequest.errorMessage)
                        } else {
                            if (!createRecipientRequest.data.Guid) {
                                logError("Error creating recipient", "No Guid returned")
                            } else {
                                newRecipients.push(createRecipientRequest.data.Guid)
                            }
                        }
                    }
                }
            }
            var resolvedRecipients = await PowerShellService.findMatchedRecipients(token, value.values)
            logInfo(resolvedRecipients.data.length.toString(), "resolved")
            var recipients: string[] = resolvedRecipients.data
            recipients.push(...newRecipients)
            if (!testing) {
                await PowerShellService.replaceRecipients(token, prefix + value.keyHash, recipients, MagicStrings.BatchPrefixSyncDL)
            } else {
                //logInfo("TESTING", "Skipping PowerShellService.replaceRecipients")
            }
            // if (missingRecipients.data.length > 0){

            // }
            //await PowerShellSerice.addMailGroup(token,MagicStrings.DistributionListPrefix+value.keyHash,value.key)

            next()

        }
        next()
    })

}

export function syncDistributionLists(segmentDataFilePath: string, testing: boolean, segment: string,prefix:string,statusWriter?:SessionStatus.Writer): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        logInfo("Check if current batch processing")
        /*
        var status = await PowerShellService.getBatchStatus(token, MagicStrings.BatchPrefixSyncDL)
        if (status.hasError) {
            logError("Check if current batch processing " + status.errorMessage)
            resolve(false)
            return
        }
        if (!status.data.done) {
            var pendingJobs = status.data.jobs.filter(job => { return !job.Processed }).map(job => job.Title).join(" \n ")
            logInfo("Found pending jobs")
            logInfo("Job pending >> ", pendingJobs)
            resolve(false)
            return
        }
        */
        statusWriter.addStep("Preparing")
        statusWriter.addJob("Group Map")
        statusWriter.startStopWatch()
        let step1 = statusWriter.addStep("Group Map")
        logInfo("Loading Group Map")

        var mapGroupsByAlias = await loadGroupAliasMap()

        step1.duration = statusWriter.elapsedTimeInSeconds()
        step1.status = SessionStatus.Status.Completed
        statusWriter.post()

        logInfo("Loading Segments")
        var segments = load(segmentDataFilePath)

        let step = statusWriter.addStep("Finding Missing Lists")

        step.status = SessionStatus.Status.Running
        statusWriter.startStopWatch()

        var segmentsMissingInExchange = findMissingDistributionLists(segments, mapGroupsByAlias, segment,prefix,statusWriter)
        step.duration = statusWriter.elapsedTimeInSeconds()
        step.status = SessionStatus.Status.Completed
        statusWriter.post()

        statusWriter.addJob("Create missing distribution lists")
        let step2 = statusWriter.addStep("Create missing distribution lists")
        statusWriter.startStopWatch()

        logInfo("createDistributionLists started")
        await createDistributionLists(segmentsMissingInExchange, testing,prefix,statusWriter)
        step2.duration = statusWriter.elapsedTimeInSeconds()
        step2.status = SessionStatus.Status.Completed
        statusWriter.post()

        statusWriter.addJob("Prepare sync members")
        let step3 = statusWriter.addStep("Prepare sync members")
        statusWriter.startStopWatch()

        logInfo("syncMembers started")
        await syncMembers(segments, testing, segment,prefix,statusWriter)
        step3.duration = statusWriter.elapsedTimeInSeconds()
        step3.status = SessionStatus.Status.Completed
        statusWriter.post()


        resolve(true)
    })
}