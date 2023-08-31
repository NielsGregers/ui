import React from "react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"

import HomeScreen from "./components/homescreen"
import { NexiLogo } from "./components/nexilogo"

export default async function Koksmat() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div className="h-screen w-full bg-[url('/hard_blur.png')] bg-cover dark:bg-[url('/hard_blur_black.png')]">
      <HomeScreen userEmail={session?.user?.email} />
      <NexiLogo />
    </div>
  )
}
