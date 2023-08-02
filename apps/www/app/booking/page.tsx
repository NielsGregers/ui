import React from "react"
import Link from "next/link"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/login"

import { User } from "./components/authstatus"

export default async function Koksmat() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div className="h-screen w-full bg-[url('/NexiEurope.svg')] bg-cover dark:bg-[url('/NexiEurope1.svg')]">
      <div className="grid h-screen place-items-center">
        <div className="place-items-center">
          <button className="rounded-full bg-[#2D32A9] from-green-400 to-blue-500 p-2 px-10 text-white hover:from-pink-500 hover:to-yellow-500">
            {" "}
            <Link href="/booking/getstarted">Click to get started</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
