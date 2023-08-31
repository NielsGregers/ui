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

export interface InvitationResult {
    "@odata.context": string
    id: string
    inviteRedeemUrl: string
    invitedUserDisplayName: any
    invitedUserType: string
    invitedUserEmailAddress: string
    sendInvitationMessage: boolean
    resetRedemption: boolean
    inviteRedirectUrl: string
    status: string
    invitedUserMessageInfo: InvitedUserMessageInfo
    invitedUser: InvitedUser
  }
  
  export interface InvitedUserMessageInfo {
    messageLanguage: any
    customizedMessageBody: any
    ccRecipients: CcRecipient[]
  }
  
  export interface CcRecipient {
    emailAddress: EmailAddress
  }
  
  export interface EmailAddress {
    name: any
    address: any
  }
  
  export interface InvitedUser {
    id: string
  }
  
export interface CreateInvitationResult   {

    user: GetAccountByEmailResult | null

    mongoid: string
    invitation: InvitationResult | null
    valid: boolean
}

export async function createInvitation(data: any): Promise<Result<CreateInvitationResult>> {

 
    const token = await getSpAuthToken()

    let user: GetAccountByEmailResult | null = null
    let result: Result<CreateInvitationResult> = { hasError: true, errorMessage: "unknown error" }
    const graphData = await getAccountByEmail(token, data.email)
    if (!graphData.hasError) {
        if (graphData.data && graphData.data.value && graphData.data.value.length > 0) {
            user = graphData.data.value[0]

        }
    }


    const invitationResult =  user ? null : (await inviteGuestUser(token, data.email))
    const client = await connect()
    try {
        const object = { data, graphData, invitation: invitationResult?.data, user }
        const insertResult = await client.db("logs-niels").collection("profiling").insertOne(object)
        result = { hasError: false, data : {
            user,
            valid:true,
            invitation : invitationResult?.data ? invitationResult.data : null,
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
    return await https<InvitationResult>(accessToken, "POST",
        `https://graph.microsoft.com/v1.0/invitations`, {
        "invitedUserEmailAddress": email,
        "inviteRedirectUrl": "https://home.nexi-intra.com/profile"
    });

}
