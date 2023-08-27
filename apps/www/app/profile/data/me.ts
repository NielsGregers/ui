import { https, httpsGetAll } from "@/lib/httphelper"
import { Membership } from "./schemas"

export interface TransitiveMemberOf {
    "@odata.type": string
    id: string
    deletedDateTime: any
    description?: string
    displayName?: string
    roleTemplateId: any
    classification: any
    createdDateTime?: string
    creationOptions?: string[]
    expirationDateTime: any
    groupTypes?: string[]
    isAssignableToRole: any
    mail?: string
    mailEnabled?: boolean
    mailNickname?: string
    membershipRule?: string
    membershipRuleProcessingState?: string
    onPremisesDomainName?: string
    onPremisesLastSyncDateTime?: string
    onPremisesNetBiosName?: string
    onPremisesSamAccountName?: string
    onPremisesSecurityIdentifier?: string
    onPremisesSyncEnabled?: boolean
    preferredDataLocation: any
    preferredLanguage: any
    proxyAddresses?: string[]
    renewedDateTime?: string
    resourceBehaviorOptions?: string[]
    resourceProvisioningOptions?: string[]
    securityEnabled?: boolean
    securityIdentifier?: string
    theme: any
    visibility?: string
    onPremisesProvisioningErrors?: any[]
    serviceProvisioningErrors?: any[]
}
export interface Root<T> {
    "@odata.context": string;
    "@odata.count": number;
    "@microsoft.graph.tips": string;
    value: T[];
}
export async function getMemberOfs(accessToken: string) {
    const items = await httpsGetAll<TransitiveMemberOf>(accessToken,
        `https://graph.microsoft.com/v1.0/me/memberOf?$count=true`);

    const memberships = items.data?.map((item) => {

        const membership: Membership = {
            groupDisplayName: item.displayName ?? "",
            mailNickname: item.mailNickname ?? "",
            
        };
        return membership;
       
    });
    return memberships ?? [];
}
