"use client"
/* eslint-disable turbo/no-undeclared-env-vars */
import "@/styles/globals.css"
import { Metadata } from "next"
import { Configuration, InteractionType, LogLevel, PublicClientApplication } from "@azure/msal-browser"
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react"

import { siteConfig } from "@/config/site"

import { SiteHeader } from "./components/site-header"
import { BookingContextProvider } from "./contextprovider"
import MSALWrapper from "./msalwrapper"

// This is important, if not set, this page will be statically generated causing the build to fail
// as the build process would need to have access to the database / api's

// export const metadata: Metadata = {
//   title: "Nexi booking solution",
//   description: "Booking tool for Nexi group members",

//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: siteConfig.url,
//     title: "Nexi booking solution",
//     description: siteConfig.description,
//     siteName: "Nexi booking solution",
//     images: [
//       {
//         url: siteConfig.ogImage,
//         width: 1200,
//         height: 630,
//         alt: siteConfig.name,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: siteConfig.name,
//     description: siteConfig.description,
//     images: [siteConfig.ogImage],
//     creator: "@shadcn",
//   },
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
//   manifest: `${siteConfig.url}/site.webmanifest`,
// }

interface RootLayoutProps {
  children: React.ReactNode
}


export default async function RootLayout({ children }: RootLayoutProps) {
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
  const pca = new PublicClientApplication(configuration)
  return (
    <MsalProvider instance={pca}>
    <BookingContextProvider>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <MSALWrapper>
          <div className="flex-1">{children}</div>
        </MSALWrapper>
      </div>
    </BookingContextProvider>
    </MsalProvider>
  )
}
