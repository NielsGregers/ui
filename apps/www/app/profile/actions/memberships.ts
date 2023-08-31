"use server";

import { Result } from "@/lib/httphelper";
import { connect } from "@/lib/mongodb";
import { getSpAuthToken } from "@/lib/officegraph";
import { getUserSession } from "@/lib/user";
import { https } from "@/lib/httphelper";




export async function setMemberships(memberId: string, membershipsToAdd: string[], membersshipsToRemove: string[]) {


    const accessToken = await getSpAuthToken()
    
    const result : any[] = []
    for (let index = 0; index < membershipsToAdd.length; index++) {
        const membership = membershipsToAdd[index];
        const res = await https<any>(accessToken, "POST",
            `https://graph.microsoft.com/v1.0/groups/${membership}/members/$ref`, {
            "@odata.id": `https://graph.microsoft.com/v1.0/directoryObjects/${memberId}`
        });
        result.push({"action":"add",membership,res})
  
    }
    for (let index = 0; index < membersshipsToRemove.length; index++) {
        const membership = membersshipsToRemove[index];
        const res = await https<any>(accessToken, "DELETE",
            `https://graph.microsoft.com/v1.0/groups/${membership}/members/${memberId}/$ref`);
            result.push({"remove":"add",membership,res})
       
    }
    return result
}
export interface CreateNewsChannelGroupResult {
    "@odata.context": string
    id: string
    deletedDateTime: any
    classification: any
    createdDateTime: string
    creationOptions: any[]
    description: any
    displayName: string
    expirationDateTime: any
    groupTypes: string[]
    isAssignableToRole: any
    mail: string
    mailEnabled: boolean
    mailNickname: string
    membershipRule: any
    membershipRuleProcessingState: any
    onPremisesDomainName: any
    onPremisesLastSyncDateTime: any
    onPremisesNetBiosName: any
    onPremisesSamAccountName: any
    onPremisesSecurityIdentifier: any
    onPremisesSyncEnabled: any
    preferredDataLocation: any
    preferredLanguage: any
    proxyAddresses: string[]
    renewedDateTime: string
    resourceBehaviorOptions: any[]
    resourceProvisioningOptions: any[]
    securityEnabled: boolean
    securityIdentifier: string
    theme: any
    visibility: string
    onPremisesProvisioningErrors: any[]
    serviceProvisioningErrors: any[]
}


export async function createNewsChannelGroup( ownerId : string,displayName: string) {

    const accessToken: string = await getSpAuthToken()
    let alias = displayName.replace(" ", "-").toLowerCase()
    const regex = /[^a-zA-Z0-9\-]/g;
    const mailNickname = alias.replace(regex, "");
    const payload = {
        displayName : `News Channel - ${displayName}`,
        "mailEnabled": false,
        mailNickname : `nexiintra-newschannel-${mailNickname}`,
        "owners@odata.bind": [
            `https://graph.microsoft.com/v1.0/users/${ownerId}`
          ],
          "resourceBehaviorOptions" :  [
            "WelcomeEmailDisabled",
            
        ],
        "securityEnabled": false,
        "groupTypes": [
            "Unified"
        ]
    }
    // const res : Result<any> = {hasError:false,data:payload}
    // return res
    return  https<CreateNewsChannelGroupResult>(accessToken, "POST",
        `https://graph.microsoft.com/v1.0/groups`, payload);

   

}



export async function setNewsChannelGroupResourceBehaviour( groupId : string,resourceBehaviorOptions: string[]) {

    const accessToken: string = await getSpAuthToken()

    const payload = {
      
          resourceBehaviorOptions,
       
    }
    // const res : Result<any> = {hasError:false,data:payload}
    // return res
    return  https<CreateNewsChannelGroupResult>(accessToken, "PATCH",
        `https://graph.microsoft.com/v1.0/groups/${groupId}`, payload);

   

}