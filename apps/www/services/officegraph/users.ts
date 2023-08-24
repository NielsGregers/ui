// "use client"
/* eslint-disable turbo/no-undeclared-env-vars */
import { getSpAuthToken } from "@/lib/officegraph"

interface ISearchResult {
    name: string
}


import { https, httpsGetAll, Result } from "@/lib/httphelper"

export async function searchUser(accessToken: string, wildcard: string): Promise<Result<ISearchResult[]>> {
    return await https(accessToken, "GET", `https://graph.microsoft.com/v1.0/users?$xselect=displayName,id&$search="displayName:${wildcard}"&$orderby=displayName&$count=true&`,)

}

