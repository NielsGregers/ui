"use server"

import { connect } from "./mongodb"

export async function LogToMongo(databaseName: "logs-niels"| "logs-karlo", collectionName: string, object: any) {
    const client = await connect()
    try {
        object.timestamp = new Date()
         await client.db(databaseName).collection(collectionName).insertOne(object)
    }

    catch (error) {
        console.log("LogToMongo error", error)

    }
    finally {
        client.close()
    }
}