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
import { NexiLogo } from "./components/nexilogo"

export default async function LoginComponent() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div className="h-screen w-full bg-[url('/hard_blur.png')] bg-cover dark:bg-[url('/hard_blur_black.png')]">
      <div className="grid h-screen place-items-center">
        <div className="place-items-center">
          <div className="rounded-full bg-[#2D32A9] from-green-400 to-blue-500 p-2 px-10 text-white hover:from-pink-500 hover:to-yellow-500">
            {" "}
            <LoginButton />{" "}
          </div>
        </div>
      </div>
      <NexiLogo />
    </div>
  )
}
