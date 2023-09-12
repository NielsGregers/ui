"use server"

import { https, httpsGetAll, httpsGetPage } from "@/lib/httphelper";
import { connect } from "@/lib/mongodb";
import { getSpAuthToken } from "@/lib/officegraph"
import { User } from "lucide-react";
import { Db, FindOptions, MongoClient } from 'mongodb';
export interface UserInfo {
    _id?: Id
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
    _id?: string
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


export interface UserWithProductInfo extends UserInfo {

    licenses: SKU[]
}
export interface ViewUserWithProductInfo {
    id:string
    userPrincipalName: string
    displayName: string
    accountEnabled: boolean
    lastSignInDateTime?: string
    licenses: SKU[]
}
interface PartialResult<T> {
    hasError: boolean
    errorMessage?: string
    nextLink?: string
    accessToken?: string
    countOfItemsRead: number
}

interface Snapshot {
    date: Date
    token: string
    creatorUPN: string
    collectionName: string
    countOfItems: number
    status: "building" | "ready" | "error"
    errorMessage?: string
}


export async function readLicenses(snapShotToken: string): Promise<ViewUserWithProductInfo[]> {
    const filter = {
        '$and': [
            {
                'licenses': {
                    '$ne': []
                }
            }, {
                'signInActivity': {
                    '$exists': false
                }
            }
        ]
    };
    const client = await connect();
    const coll = client.db('sandbox').collection<UserWithProductInfo>('license_info');
   // const cursor = coll.find(filter);
    const cursor = coll.find();
    const result = await cursor.toArray();

    await client.close();
    
    return result.map(user => {
        const v: ViewUserWithProductInfo = {
            id:user.id,
            userPrincipalName: user.userPrincipalName,
            displayName: user.displayName,
            accountEnabled: user.accountEnabled,
            lastSignInDateTime: user.signInActivity?.lastSignInDateTime,
            licenses: user.licenses
        }
        return v
    })




}


export async function snapshotLicenses(snapShotToken: string, lasttoken?: string, nextLink?: string): Promise<PartialResult<UserWithProductInfo>> {

    const token = lasttoken ? lasttoken : (await getSpAuthToken())
    const url = nextLink ? nextLink : "https://graph.microsoft.com/beta/users?$select=mail,userPrincipalName, displayName,signInActivity,onPremisesExtensionAttributes,accountEnabled,assignedLicenses&$filter=assignedLicenses/$count+ne+0&$count=true&$top=999"


    const response = await httpsGetPage<UserInfo>(token, url)
    if (response.hasError) {
        const errorresult: PartialResult<UserWithProductInfo> = {
            hasError: true,
            countOfItemsRead: 0,
            errorMessage: response.errorMessage
        }
        return errorresult
    }
    const users = response.data ?? []
    const client = await connect();
    const licenseInfoColl = client.db('sandbox').collection<UserWithProductInfo>('license_info')
    if (!lasttoken) {
        licenseInfoColl.deleteMany({})
    }


    const coll2 = client.db('sandbox').collection<SKU>('skus');
    const cursor2 = coll2.find();
    const skus = await cursor2.toArray()

    const userWithProductInfo = users.map(user => {
        delete user._id
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
            const r = sku ?? emptySKU
            delete r._id
            return r
        })
        const u: UserWithProductInfo = { ...user, licenses }

        return u

    });
    await licenseInfoColl.insertMany(userWithProductInfo)
    await client.close();
    const result: PartialResult<UserWithProductInfo> = {
        hasError: false,
        countOfItemsRead: userWithProductInfo.length,
        accessToken: token,
        nextLink: response.nextLink
    }
    return result
}