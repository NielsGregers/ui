
/**
 * Sample server side action
 * @param data
 * @returns
 */
export interface InvitationResult {
    "@odata.context": string;
    id: string;
    inviteRedeemUrl: string;
    invitedUserDisplayName: any;
    invitedUserType: string;
    invitedUserEmailAddress: string;
    sendInvitationMessage: boolean;
    resetRedemption: boolean;
    inviteRedirectUrl: string;
    status: string;
    invitedUserMessageInfo: InvitedUserMessageInfo;
    invitedUser: InvitedUser;
}

export interface InvitedUserMessageInfo {
    messageLanguage: any;
    customizedMessageBody: any;
    ccRecipients: CcRecipient[];
}

export interface CcRecipient {
    emailAddress: EmailAddress;
}

export interface EmailAddress {
    name: any;
    address: any;
}

export interface InvitedUser {
    id: string;
}
