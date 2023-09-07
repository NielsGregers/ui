"use client"

import { useState } from "react"

import {
  SharePointExtension,
  SharePointExtensionContext,
} from "./usecasecontext"

type Props = {
  children?: React.ReactNode
}

export const UsercaseProvider = ({ children }: Props) => {
  const [token, settokenlocal] = useState(sessionStorage.getItem("token") ?? "")
  const [parentlocation, setparentlocationlocal] = useState(
    sessionStorage.getItem("parentlocation") ?? ""
  )
  const settoken = (s: string) => {
    settokenlocal(s)
    sessionStorage.setItem("token", s)
  }
  const setparentlocation = (s: string) => {
    setparentlocationlocal(s)
    sessionStorage.setItem("parentlocation", s)
  }
  const usecases: SharePointExtension = {
    token,
    settoken,
    parentlocation,
    setparentlocation,
  }
  return (
    <SharePointExtensionContext.Provider value={usecases}>
      {children}
    </SharePointExtensionContext.Provider>
  )
}
