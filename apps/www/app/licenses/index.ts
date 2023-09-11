"use server"

import { https, httpsGetAll, httpsGetPage } from "@/lib/httphelper";
import { connect } from "@/lib/mongodb";
import { getSpAuthToken } from "@/lib/officegraph"
import { User } from "lucide-react";
import { FindOptions, MongoClient } from 'mongodb';
export interface UserInfo {
    _id: Id
    mail: string
    userPrincipalName: string
    displayName: string
    accountEnabled: boolean
    id: string
    onPremisesExtensionAttributes: OnPremisesExtensionAttributes
    assignedLicenses: AssignedLicense[]
    signInActivity: SignInActivity
}

export interface Id {
    $oid: string
}

export interface OnPremisesExtensionAttributes {
    extensionAttribute1: any
    extensionAttribute2: any
    extensionAttribute3: any
    extensionAttribute4: string
    extensionAttribute5: any
    extensionAttribute6: string
    extensionAttribute7: any
    extensionAttribute8: any
    extensionAttribute9: string
    extensionAttribute10: string
    extensionAttribute11: string
    extensionAttribute12: any
    extensionAttribute13: string
    extensionAttribute14: string
    extensionAttribute15: any
}

export interface AssignedLicense {
    disabledPlans: any[]
    skuId: string
}

export interface SignInActivity {
    lastSignInDateTime: string
    lastSignInRequestId: string
    lastNonInteractiveSignInDateTime: string
    lastNonInteractiveSignInRequestId: string
}
export interface SKU {
    _id: string
    Product_Display_Name: string
    String_Id: string
    GUID: string
    Service_Plan_Name: string
    Service_Plan_Id: string
    Service_Plans_Included_Friendly_Names: string
}

export interface Id {
    $oid: string
}


export interface UserWithProductInfo {
    user: UserInfo
    licenses: SKU[]
}

interface PartialResult<T> {
    hasError: boolean
    errorMessage?: string
    nextLink?: string
    accessToken?: string
    items?: T[]
}
export async function readLicense(lasttoken?: string, nextLink?: string): Promise<PartialResult<UserWithProductInfo>> {
    
    const token = lasttoken ? lasttoken : (await getSpAuthToken())
    const url = nextLink  ? nextLink: "https://graph.microsoft.com/beta/users?$select=mail,userPrincipalName, displayName,signInActivity,onPremisesExtensionAttributes,accountEnabled,assignedLicenses&$filter=assignedLicenses/$count+ne+0&$count=true&$top=999"
    
    
    const response = await httpsGetPage<UserInfo>(token, url)
    if (response.hasError) {
        const errorresult: PartialResult<UserWithProductInfo> = {
            hasError: true,
            errorMessage: response.errorMessage
        }
        return errorresult
    }
    const users = response.data ?? []
    const client = await connect();
    const coll2 = client.db('sandbox').collection<SKU>('skus');
    const cursor2 = coll2.find();
    const skus = await cursor2.toArray()

    const userWithProductInfo = users.map(user => {
        const licenses = user.assignedLicenses.map(license => {

            const sku = skus.find(sku => sku.GUID === license.skuId)
            if (sku) sku._id = ""
            const emptySKU: SKU = {
            _id: "",
                Product_Display_Name: "Unknown",
                String_Id: "",
                GUID: "",
                Service_Plan_Name: "",
                Service_Plan_Id: "",
                Service_Plans_Included_Friendly_Names: ""
            }
            return sku ?? emptySKU
        })
        const u: UserWithProductInfo = { user, licenses }
        return u

    });

    await client.close();
    const result: PartialResult<UserWithProductInfo> = {
        hasError: false,
        items: userWithProductInfo,//.filter(user => user.licenses.length > 0),
        accessToken: token,
        nextLink: response.nextLink
    }
    return result
}