"use client"

import { useContext, useEffect, useState } from "react"
import {
  Configuration,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser"
import { MsalProvider, useAccount, useMsal } from "@azure/msal-react"

import { Result, https } from "@/lib/httphelper"

import { BookingContext, BookingContextProps } from "./context"
import { aquireToken } from "./msal"

type Props = {
  children?: React.ReactNode
}

interface CaseProps {
  scopes: string[]
  title: string
  testurl: string
  token?: string
}
export const BookingContextProvider = ({ children }: Props) => {
  const [something, setsomething] = useState("1")
  const [roles, setroles] = useState<string[]>([])
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})
  const [latestResponse, setlatestResponse] = useState<any>()
  const [latestError, setlatestError] = useState<any>()

  useEffect(() => {
    
    if (account) {
      setroles(account.idTokenClaims?.roles ?? [])
    }
  }, [account, setroles, accounts, inProgress, instance])
  useEffect(() => {
    const aquireToken = async (thisCase?: CaseProps) => {
      setlatestError(undefined)
      setlatestResponse(undefined)
      if (account && thisCase) {
        try {
          const response = await instance.acquireTokenSilent({
            scopes: thisCase?.scopes ?? [],
            account: account,
          })
          thisCase.token = response.accessToken
          const getResponse = await https(
            response.accessToken,
            "GET",
            thisCase.testurl
          )
          setlatestResponse(getResponse)
        } catch (error) {
          try {
            const response = await instance.acquireTokenPopup({
              scopes: thisCase?.scopes ?? [],
              account: account,
            })
            thisCase.token = response.accessToken
            const getResponse = await https(
              response.accessToken,
              "GET",
              thisCase.testurl
            )
            setlatestResponse(getResponse)
          } catch (error) {
            setlatestError(error)
          }
        }
      }
    }
    aquireToken({
      scopes: ["User.Read"],
      title: "Read user profile",
      testurl: "https://graph.microsoft.com/v1.0/me",
    })
  }, [account, instance])

  const bookingContext: BookingContextProps = {
    something,
    changeSomething: function (changeTo: string): void {
      setsomething(changeTo)
    },
    roles,
    setRoles: function (roles: string[]): void {
      setroles(roles)
    },
    account,
    getToken: async function (scopes: string[]): Promise<Result<string>> {
      if (!account) {
        return {hasError:true,errorMessage:"No account"}

      }
      const tokenResult = await aquireToken(instance, account, scopes)
      return tokenResult
    }
  }

  return (
  
    <BookingContext.Provider value={bookingContext}>
      {children}
    </BookingContext.Provider>
  )
}
