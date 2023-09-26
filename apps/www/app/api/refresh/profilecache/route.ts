/* eslint-disable turbo/no-undeclared-env-vars */


import { refreshProfileCache } from "@/app/profile/data/cache"
import { NextRequest } from "next/server"


export async function POST(req: NextRequest) {

  await refreshProfileCache()

}