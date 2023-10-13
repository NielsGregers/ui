import React from "react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"

import AnonymousScreen from "./components/anonymousScreen"
import HomeScreen from "./components/homescreen"
import MaintainanceScreen from "./components/maintainanceScreen"
import { NexiLogo } from "./components/nexilogo"

export default async function Koksmat() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div className="h-[92.3vh] w-full bg-[url('/hard_blur.png')] bg-cover dark:bg-[url('/hard_blur_black.png')]">
      {/* {session && <HomeScreen userEmail={session?.user?.email} />}
      {!session && <AnonymousScreen />} */}
      {/* <NexiLogo /> */}
      <MaintainanceScreen />
    </div>
  )
}
