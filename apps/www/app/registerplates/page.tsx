import React from "react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { getUserSession } from "@/lib/user"

import AnonymousScreen from "./components/anonymousScreen"
import HomeScreen from "./components/homescreen"
import { NexiLogo } from "./components/nexilogo"

export default async function Koksmat() {
  const session = await getUserSession()
  console.log(session)
  return (
    <div className="h-[92vh] w-full bg-[url('/hard_blur.png')] bg-cover dark:bg-[url('/hard_blur_black.png')]">
      {session && (
        <HomeScreen
          userName={session?.user?.name}
          userEmail={session?.user?.email}
        />
      )}
      {!session && <AnonymousScreen />}
    </div>
  )
}
