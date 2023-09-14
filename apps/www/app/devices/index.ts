"use server"

import { https, httpsGetAll, httpsGetPage } from "@/lib/httphelper";
import { connect } from "@/lib/mongodb";
import { getSpAuthToken } from "@/lib/officegraph"
import { User } from "lucide-react";
import { Db, FindOptions, MongoClient } from 'mongodb';

export interface Device {
    id: string
    deletedDateTime: any
    accountEnabled: boolean
    approximateLastSignInDateTime: string
    complianceExpirationDateTime: any
    createdDateTime: string
    deviceCategory: string
    deviceId: string
    deviceMetadata: any
    deviceOwnership: string
    deviceVersion: number
    displayName: string
    domainName: any
    enrollmentProfileName: any
    enrollmentType: string
    externalSourceName: any
    isCompliant: boolean
    isManaged: boolean
    isManagementRestricted: any
    isRooted: boolean
    managementType: string
    manufacturer: string
    mdmAppId: string
    model: string
    onPremisesLastSyncDateTime: any
    onPremisesSyncEnabled: any
    operatingSystem: string
    operatingSystemVersion: string
    hostnames: any[]
    physicalIds: any[]
    profileType: string
    registrationDateTime: string
    sourceType: any
    systemLabels: any[]
    trustType: string
    alternativeSecurityIds: AlternativeSecurityId[]
    extensionAttributes: ExtensionAttributes
  }
  
  export interface AlternativeSecurityId {
    type: number
    identityProvider: any
    key: string
  }
  
  export interface ExtensionAttributes {
    extensionAttribute1: any
    extensionAttribute2: any
    extensionAttribute3: any
    extensionAttribute4: any
    extensionAttribute5: any
    extensionAttribute6: any
    extensionAttribute7: any
    extensionAttribute8: any
    extensionAttribute9: any
    extensionAttribute10: any
    extensionAttribute11: any
    extensionAttribute12: any
    extensionAttribute13: any
    extensionAttribute14: any
    extensionAttribute15: any
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


export async function readDevices(snapShotToken: string): Promise<Device[]> {
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
    const coll = client.db('sandbox').collection<Device>('devices');
   // const cursor = coll.find(filter);
    const cursor = coll.find();
    const result = await cursor.toArray();
    

    await client.close();
    return result
    





}

export async function snapshotDevices(snapShotToken: string, lasttoken?: string, nextLink?: string): Promise<PartialResult<any>> {

    const token = lasttoken ? lasttoken : (await getSpAuthToken())
    const url = nextLink ? nextLink : "https://graph.microsoft.com/beta/devices?$top=999"


    const response = await httpsGetPage<Device>(token, url)
    if (response.hasError) {
        const errorresult: PartialResult<any> = {
            hasError: true,
            countOfItemsRead: 0,
            errorMessage: response.errorMessage
        }
        return errorresult
    }
    const users = response.data ?? []
    const client = await connect();
    const licenseInfoColl = client.db('sandbox').collection<Device>('devices')
    if (!lasttoken) {
        licenseInfoColl.deleteMany({})
    }




    await licenseInfoColl.insertMany(response.data ?? [])
    await client.close();
    const result: PartialResult<any> = {
        hasError: false,
        countOfItemsRead: (response.data ?? []).length,
        accessToken: token,
        nextLink: response.nextLink
    }
    return result
}