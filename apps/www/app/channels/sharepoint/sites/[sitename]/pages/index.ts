"use server"

import { getProfileCache } from "@/app/profile/data/cache"


export async function getProfileData() {
return getProfileCache()
}