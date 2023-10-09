"use server"

import { cookies } from "next/headers"

//promise {country: "NL", unit: "NL"}
export async function getUserCookie() {
  const cookie = cookies().get("user")?.value
  let cookieParsed = { country: undefined, unit: undefined } as {
    country: string | undefined
    unit: string | undefined
  }
  if (cookie !== undefined) {
    cookieParsed = JSON.parse(cookie as string) ?? {}
  }
  return cookieParsed
}

export async function getCookie(name: string) {
  const cookie = cookies().has("user")
    ? JSON.parse(cookies().get("user")?.value as string)
    : {}
  return cookie
}
