/* eslint-disable turbo/no-undeclared-env-vars */

import { connect } from "@/lib/mongodb"
import { getSpAuthToken } from "@/lib/officegraph"

const KEY = "profilecache"
export interface ProfileCache {
  date: Date
  key: string
  data:any
}

export type getProfileCache = ()=> Promise<any>


export async function refreshProfileCache<T>(getData: getProfileCache) {
    console.log("Refreshing profile cache")
  const client = await connect()
  const cache = await getData()

await client
    .db(process.env.DATABASE)
    .collection<ProfileCache>("cache")
    .deleteMany({ key: KEY })

    await client
      .db(process.env.DATABASE)
      .collection<ProfileCache>("cache")
      .insertOne({date: new Date(), key: KEY, data: ""})
  
  await client.close()
  return cache
}

/**
 * 
 * 
 *  
 *  const getData = async ()=>{
    const dummy : ProfileCache= {
      date: new Date,
      key: "",
      data: undefined
    }
    return dummy}

 * @param getData 
 * @param TTL Time to live in minutes 
 * @returns 
 */


export async function getProfileCache(getData: getProfileCache,TTL: number = 1) {
  const client = await connect()

  let cache = await client
    .db(process.env.DATABASE)
    .collection<ProfileCache>("cache")
    .findOne({ key: KEY })


  if (cache) {
    const now = new Date()
    const diff = now.getTime() - cache.date.getTime()
    const diffInMinutes = Math.round(diff / 60000)
    if (diffInMinutes > TTL) {
      await refreshProfileCache(getData)
      cache = await client
        .db(process.env.DATABASE)
        .collection<ProfileCache>("cache")
        .findOne({ key: KEY })
    }
  }else{
    await refreshProfileCache(getData)
    cache = await client
      .db(process.env.DATABASE)
      .collection<ProfileCache>("cache")
      .findOne({ key: KEY })
  }

  await client.close()
  return cache
}
