/* eslint-disable turbo/no-undeclared-env-vars */
import "@/styles/globals.css"
import { Metadata } from "next"

import { MSALContextProvider } from "@/lib/msal/contextprovider"
import { useProcess } from "@/lib/useprocess"

import { KoksmatProvider } from "./contextprovider"
import { RunCentrifugo } from "./run-centrifugo"
import { siteConfig } from "./site"
import ClientLayout from "./tenants/[tenant]/site/[site]/clientlayout"
import { SiteHeader } from "./tenants/[tenant]/site/[site]/components/site-header"

interface RootLayoutProps {
  children: React.ReactNode
  params: { site: string; tenant: string }
}

export const metadata: Metadata = {
  title: {
    default: "Koksmat",
    template: `%s - Koksmat`,
  },

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <div>
      <MSALContextProvider
        clientId={"2c1a064d-6ec3-4f83-9ac7-6996c22247e0"}
        authority={
          "https://login.microsoftonline.com/79dc228f-c8f2-4016-8bf0-b990b6c72e98"
        }
        redirectUri={"/koksmat"}
      >
        <KoksmatProvider root={process.env.KOKSMATROOT ?? ""} kitchenroot={process.env?.KITCHENROOT ??""}>
          <SiteHeader />
          <RunCentrifugo />
          <div>{children}</div>
        </KoksmatProvider>
      </MSALContextProvider>
    </div>
  )
}
