import { https, httpsGetAll, Result } from "@/lib/httphelper";
import { getSpAuthToken as getToken} from "@/lib/officegraph"
import { resolve } from "path";

interface GetGroupProps {
    memberAddress: string
    requestResult: Result<GraphResultGroupProps[]>
}

interface GraphResultGroupProps {
    mail:string
    displayName:string
    mailEnabled:boolean

}

const getGroups = (token: string, memberAddress: string): Promise<GetGroupProps> => {
    return new Promise(async (resolve, reject) => {

        var requestResult = await httpsGetAll<GraphResultGroupProps>(token, `https://graph.microsoft.com/v1.0/users/${memberAddress}/memberOf?$select=mail,displayName,id,mailEnabled`)
        var result = { memberAddress, requestResult }

        resolve(result)
    })

}

export function union(addresses: string[]): Promise<any> {
    return new Promise(async (resolve, reject) => {
        var token = await getToken()
        var queries = addresses.map(address => getGroups(token, address))
        var results = await Promise.all(queries)
        var matches: Map<string, string[]> = new Map<string, string[]>()

        results.forEach(result => {
            if (!result.requestResult.hasError) {
                result.requestResult?.data?.forEach(groupAddress => {
                    if (!groupAddress.mailEnabled) return
                    if (matches.has(groupAddress.mail)) {
                        matches.get(groupAddress.mail)?.push(result.memberAddress)
                    }else{
                        matches.set(groupAddress.mail,[result.memberAddress])
                    }
                })
            }
        })
        //var resultObject = Object.fromEntries(matches)
        var resultObject = Object.entries( Object.fromEntries(matches)).map(o=>{
            return {groupAddress:o[0],matchedMembers:o[1]}
        })
        
        var matched = resultObject.filter(o=>o.matchedMembers.length===addresses.length).map(o=>o.groupAddress)

        resolve({matched,compared:resultObject})        






    })
}
