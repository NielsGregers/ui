"use server";

import { Result } from "@/lib/httphelper";
import { connect } from "@/lib/mongodb";
import { getSpAuthToken } from "@/lib/officegraph";
import { getUserSession } from "@/lib/user";
import { https } from "@/lib/httphelper";
/**
 * Sample server side action
 * @param data 
 * @returns 
 */
export interface CreateInvitationResult   {

    user: GetAccountByEmailResult | null

    mongoid: string
    invitation: any
}

export async function createInvitation(data: any): Promise<Result<CreateInvitationResult>> {

    const session = await getUserSession()
    if (!session) return { hasError: true, errorMessage: "You are not logged in" }

    const token = await getSpAuthToken()

    let user: GetAccountByEmailResult | null = null
    let result: Result<CreateInvitationResult> = { hasError: true, errorMessage: "unknown error" }
    const graphData = await getAccountByEmail(token, data.email)
    if (!graphData.hasError) {
        if (graphData.data && graphData.data.value && graphData.data.value.length > 0) {
            user = graphData.data.value[0]

        }
    }


    const invitation =  user ? null : (await inviteGuestUser(token, data.email))
    const client = await connect()
    try {
        const object = { data, session, graphData, invitation }
        const insertResult = await client.db("sandbox").collection("profiling").insertOne(object)
        result = { hasError: false, data : {
            user,
            invitation,
            mongoid: insertResult.insertedId.toString()
        }}
    }

    catch (error) {
        let message = "unknown error"
        if (error instanceof Error) message = error.message
        result.hasError = true
        result.errorMessage = message

    }
    finally {
        client.close()
    }
    return result
}
export interface Root<T> {
    "@odata.context": string;
    "@odata.count": number;
    "@microsoft.graph.tips": string;
    value: T[];
}

export interface GetAccountByEmailResult {

    displayName: string;
    userType: string;
    mail: string;
    userPrincipalName: string;
    externalUserState: string;
    id: string;
}


export async function getAccountByEmail(accessToken: string, email: string) {
    return await https<Root<GetAccountByEmailResult>>(accessToken, "GET",
        `https://graph.microsoft.com/v1.0/users?$filter=endsWith(mail,'${email}')&$count=true&$select=userType,displayName,mail,userPrincipalName,externalUserState`);

}

export async function inviteGuestUser(accessToken: string, email: string) {
    return await https<Root<any>>(accessToken, "POST",
        `https://graph.microsoft.com/v1.0/invitations`, {
        "invitedUserEmailAddress": email,
        "inviteRedirectUrl": "https://home.nexi-intra.com/profile"
    });

}
