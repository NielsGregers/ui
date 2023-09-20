"use client"

import { useEffect, useState } from "react"

import {
  SharePointExtension,
  SharePointExtensionContext,
} from "./usecasecontext"

type Props = {
  children?: React.ReactNode
}

export const UsercaseProvider = ({ children }: Props) => {
  const [token, settokenlocal] = useState("")
  const [parentlocation, setparentlocationlocal] = useState("")
  const settoken = (s: string) => {
    settokenlocal(s)
    window?.sessionStorage.setItem("token", s)
  }
  const setparentlocation = (s: string) => {
    setparentlocationlocal(s)
    window?.sessionStorage.setItem("parentlocation", s)
  }
  const usecases: SharePointExtension = {
    token,
    settoken,
    parentlocation,
    setparentlocation,
  }
  useEffect(() => {
    settokenlocal(window.sessionStorage.getItem("token") ?? "")
    setparentlocationlocal(window.sessionStorage.getItem("parentlocation") ?? "")

  }, [])

  return (
    <SharePointExtensionContext.Provider value={usecases}>
      {children}
    </SharePointExtensionContext.Provider>
  )
}
