"use client"
import React, { useContext } from "react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"

import AnonymousScreen from "./components/anonymousScreen"
import HomeScreen from "./components/homescreen"
import MaintainanceScreen from "./components/maintainanceScreen"
import { NexiLogo } from "./components/nexilogo"
import { BookingContext } from "./context"

export default  function Koksmat() {
  //const session = await getServerSession(authOptions)
  const bookingContext = useContext(BookingContext)
  //console.log(session)
  return (
    <div className="h-[92.9vh] w-full bg-[url('/hard_blur.png')] bg-cover dark:bg-[url('/hard_blur_black.png')]">
      {bookingContext.account && <HomeScreen userEmail={bookingContext.account.username} />}
      {!bookingContext.account && <AnonymousScreen />} 
      {/* <MaintainanceScreen /> */}
    </div>
  )
}
