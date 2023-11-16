"use client"

import { useContext, useEffect, useState } from "react"

import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";
import { BookingContext, BookingContextProps } from "./context"

type Props = {
  children?: React.ReactNode
}


// MSAL configuration
const configuration: Configuration = {
  auth: {
    clientId: "2c1a064d-6ec3-4f83-9ac7-6996c22247e0",
    authority: "https://login.microsoftonline.com/79dc228f-c8f2-4016-8bf0-b990b6c72e98",
    redirectUri:"/booking"
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
    loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
            if (containsPii) {
                return;
            }
            
            switch (level) {
                case LogLevel.Error:
                    console.error(message);
                    return;
                case LogLevel.Info:
                    console.info(message);
                    return;
                case LogLevel.Verbose:
                    console.debug(message);
                    return;
                case LogLevel.Warning:
                    console.warn(message);
                    return;
                default:
                    return;
            }
        },
    },
  },
};

export const BookingContextProvider = ({ children }: Props) => {

  const [something, setsomething] = useState("1")
  const [roles, setroles] = useState<string[]>([])
  const bookingContext: BookingContextProps = {
    something,
    changeSomething: function (changeTo: string): void {
      setsomething(changeTo);
    },
    roles,
    setRoles: function (roles: string[]): void {
     setroles(roles)
    }
  }
  const pca = new PublicClientApplication(configuration);
  return (
    <BookingContext.Provider value={bookingContext}>
       <MsalProvider instance={pca}>
      {children}
      </MsalProvider>
    </BookingContext.Provider>
  )
}
