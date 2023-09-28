"use server"

import { Config } from "@/lib/config"

export async function saveInstance() {
  await  Config.saveInstance("www")
}


export async function getInstanceString() : Promise<string> {
    const config = await Config.getInstance("www")

    return  JSON.stringify(config)
  }