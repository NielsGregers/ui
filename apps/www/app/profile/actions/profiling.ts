/* eslint-disable turbo/no-undeclared-env-vars */
"use server"
import { cookies } from "next/headers";
import { connect } from "@/lib/mongodb";
import { Root } from "./onboarding";
import { https } from "@/lib/httphelper";
import { setMemberships } from "./memberships";

export const saveProfile = async (upn: string, country: string, unit: string, membershipsToAdd: string[], membershipsToRemove: string[]) => {
    const client = await connect()
    const collection = client.db(process.env.DATABASE).collection("profiles")

    const existingProfile = await collection.findOne({ upn })
    if (existingProfile) {
        await collection.updateOne({ upn }, { $set: { country, unit } })
    } else {
        await collection.insertOne({ upn, country, unit })
    }

    const setMembershipsResuls = await setMemberships(upn, membershipsToAdd, membershipsToRemove)
    await client.db("logs-niels").collection("saveprofile").insertOne({ upn, country, unit,membershipsToAdd, membershipsToRemove,setMembershipsResuls})
    client.close()

    cookies().set('user', JSON.stringify({ country, unit }), { path: '/' });
    return ({ href: "/load", target: "_self" ,setMembershipsResuls});

}



export const getprofile = async (upn: string) => {
    const client = await connect()
    const profile: any = await client.db(process.env.DATABASE).collection("profiles").findOne({ upn })
    client.close()
    return profile ? ({ country: profile.country, unit: profile.unit }) : null




}


