/* eslint-disable turbo/no-undeclared-env-vars */
import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"


import { SiteHeader } from "./components/site-header"
import { BookingContextProvider } from "./contextprovider"


// This is important, if not set, this page will be statically generated causing the build to fail
// as the build process would need to have access to the database / api's

export const metadata: Metadata = {
  title: "Nexi booking solution",
  description: "Booking tool for Nexi group members",

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Nexi booking solution",
    description: siteConfig.description,
    siteName: "Nexi booking solution",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@shadcn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
<BookingContextProvider>
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      {/* <ForModule module="Booking"> */}
      <div className="flex-1">{children}</div>
      {/* </ForModule> */}
      {/* <SiteFooter /> */}
    </div>
    </BookingContextProvider>
  )
}
