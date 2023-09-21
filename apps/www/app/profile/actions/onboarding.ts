"use server";

import { Result } from "@/lib/httphelper";
import { connect } from "@/lib/mongodb";
import { getSpAuthToken } from "@/lib/officegraph";
import { getUserSession } from "@/lib/user";
import { https } from "@/lib/httphelper";
import { logMagicpot } from "@/lib/magicpot";
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

export interface CreateInvitationResult {

    user: GetAccountByEmailResult | null

    //mongoid: string
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
    } else {
        await logMagicpot("Profile", "createInvitation", { status: "Cannot get user from graph", data, graphData, user })
        result = { hasError: true, errorMessage: graphData.errorMessage }
        return result
    }


    let invitationResult = null


    if (!user) {
        invitationResult = await inviteGuestUser(token, data.email)
        if (invitationResult.hasError) {
            await logMagicpot("Profile", "createInvitation", { status: "Cannot create guest invitation", data, graphData, invitationResult, user })
            result = { hasError: true, errorMessage: invitationResult.errorMessage }
            return result
        }
    }


    result = {
        hasError: false, data: {
            user,
            valid: true,
            invitation: invitationResult?.data ? invitationResult.data : null

        }
    }
    await logMagicpot("Profile", "createInvitation", { status: "OK", data, graphData, invitationResult, user })


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
