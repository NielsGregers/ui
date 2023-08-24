/* eslint-disable turbo/no-undeclared-env-vars */
"use server"
import { cookies } from "next/headers";
import { connect } from "@/lib/mongodb";

export const saveProfile = async (upn:string,country:string,unit:string) => {
    const client = await connect()
    const collection = client.db(process.env.DATABASE).collection("profiles")

    const existingProfile =  await collection.findOne( {upn})
    if (existingProfile) {
        collection.updateOne({upn},{$set:{country,unit}})
    }else{
        await collection.insertOne({upn,country,unit})
    }
    client.close()
    cookies().set('user', JSON.stringify({ country, unit }), { path: '/' });
    return ({href:"/load",target: "_self"});

}



export const getprofile = async (upn:string) => {
    const client = await connect()
    const profile : any = await client.db(process.env.DATABASE).collection("profiles").findOne( {upn})
   client.close()
        return  profile ? ({country:profile.country,unit:profile.unit}) : null
  

   

}



