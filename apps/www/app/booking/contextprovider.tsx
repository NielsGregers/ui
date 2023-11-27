"use client"

import { useContext, useEffect, useState } from "react"
import {
  Configuration,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser"
import { MsalProvider, useAccount, useMsal } from "@azure/msal-react"

import { https } from "@/lib/httphelper"

import { BookingContext, BookingContextProps } from "./context"

type Props = {
  children?: React.ReactNode
}

// MSAL configuration
const configuration: Configuration = {
  auth: {
    clientId: "2c1a064d-6ec3-4f83-9ac7-6996c22247e0",
    authority:
      "https://login.microsoftonline.com/79dc228f-c8f2-4016-8bf0-b990b6c72e98",
    redirectUri: "/booking",
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return
        }

        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
          default:
            return
        }
      },
    },
  },
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
  }
  const pca = new PublicClientApplication(configuration)
  return (
    <MsalProvider instance={pca}>
    <BookingContext.Provider value={bookingContext}>
      {children}
    </BookingContext.Provider></MsalProvider>
  )
}
