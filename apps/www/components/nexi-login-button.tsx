"use client"

import React, { useState } from "react"
import { signIn } from "next-auth/react"

function NexiLoginButton() {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="flex min-h-[30px] w-max flex-row hover:cursor-pointer"
      onClick={() => signIn("azure-ad")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${
          isHovered ? "bg-slate-200" : "bg-white"
        } flex items-center justify-center rounded-s-xl border-2 border-blue-800 p-2 `}
      >
        <img src="/NEXI_RGB_Colore.png" alt="Booking" width={50} className="" />
      </div>
      <div
        className={`${
          isHovered ? "bg-blue-900" : "bg-blue-800"
        } h-[100%] rounded-e-xl p-3 text-center font-semibold text-white`}
      >
        Sign in with Nexi Group
      </div>
    </div>
  )
}

export default NexiLoginButton
