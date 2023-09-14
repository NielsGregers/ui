"use server"

import { https, httpsGetAll, httpsGetPage } from "@/lib/httphelper";
import { connect } from "@/lib/mongodb";
import { getSpAuthToken } from "@/lib/officegraph"
import { User } from "lucide-react";
import { Db, FindOptions, MongoClient } from 'mongodb';


  
  export interface Subcription {
    id: string
    resource: string
    applicationId: string
    changeType: string
    clientState: any
    notificationUrl: string
    notificationQueryOptions: any
    lifecycleNotificationUrl: any
    expirationDateTime: string
    creatorId: string
    includeResourceData: any
    latestSupportedTlsVersion: string
    encryptionCertificate: any
    encryptionCertificateId: any
    notificationUrlAppId: any
  }
  





export async function getExistingSubscriptions() {

    const token = await getSpAuthToken()
    return httpsGetAll<Subcription>(token, "https://graph.microsoft.com/v1.0/subscriptions")
    
}