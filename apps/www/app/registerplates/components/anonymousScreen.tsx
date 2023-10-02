"use client"

import React from "react"

import NexiLoginButton from "@/components/nexi-login-button"

function AnonymousScreen() {
  return (
    <div className="container flex min-h-[90vh] flex-col content-center items-center justify-center gap-2  ">
      <div className="flex flex-col content-center items-center justify-center gap-2  rounded-xl bg-black bg-opacity-5 p-7 dark:bg-white dark:bg-opacity-5">
        <div className="text-center text-4xl">
          Welcome to Nexi booking solution
        </div>
        <div className="pt-4 text-center text-xl italic">
          Please sign in to continue
        </div>
        <NexiLoginButton />
      </div>
    </div>
  )
}

export default AnonymousScreen
