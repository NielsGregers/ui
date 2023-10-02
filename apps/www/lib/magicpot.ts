"use server"
import { connect } from "@/lib/mongodb"

export async function logMagicpot(application : string,area:string, object:any) {
    try {

        const client = await connect()
        const doc = {
            date: new Date(),
            ...object
        }
        await client.db("magicpot_"+application).collection("log_"+area).insertOne(doc)
        client.close()
    } catch (error) {
        console.log("magicpot log",error)
    }
   
}

