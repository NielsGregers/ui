/* eslint-disable turbo/no-undeclared-env-vars */
import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { getUserSession } from "@/lib/user"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"
import { LoginButton } from "@/components/login"
import { SiteFooter } from "@/components/magicbox-site-footer"
import { ThemeProvider } from "@/components/providers"
import { ForModule } from "@/components/roles"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster as DefaultToaster } from "@/registry/default/ui/toaster"
import { Toaster as NewYorkToaster } from "@/registry/new-york/ui/toaster"
import { MagicboxProvider } from "./magicbox-providers";

import { NextAuthProvider } from "./providers"
import { headers } from 'next/headers'


import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "nexi",
    "intra"

  ],
  authors: [
    {
      name: "shadcn",
      url: "https://shadcn.com",
    },
    {
      name: "nielsgregers",
      url: "https://www.linkedin.com/in/niels-gregers-johansen/",
    },
  ],
  creator: "shadcn",
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
    creator: "@niegrejoh",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",

  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}
export interface Root {
  "@odata.context": string
  "@microsoft.graph.tips": string
  value: Value[]
}

export interface Value {
  "@odata.etag": string
  createdDateTime: string
  eTag: string
  id: string
  lastModifiedDateTime: string
  webUrl: string
  createdBy: CreatedBy
  lastModifiedBy: LastModifiedBy
  parentReference: ParentReference
  contentType: ContentType
  "fields@odata.context": string
  fields: Fields
}

export interface CreatedBy {
  user: User
}

export interface User {
  email: string
  id: string
  displayName: string
}

export interface LastModifiedBy {
  user: User2
}

export interface User2 {
  email: string
  id: string
  displayName: string
}

export interface ParentReference {
  id: string
  siteId: string
}

export interface ContentType {
  id: string
  name: string
}

export interface Fields {
  "@odata.etag": string
  Title: string
  LinkTitle: string
  Welcomeprompt?: string
  Sitename?: string
  TrackingCode: string
  id: string
  ContentType: string
  Modified: string
  Created: string
  AuthorLookupId: string
  EditorLookupId: string
  _UIVersionString: string
  Attachments: boolean
  Edit: string
  LinkTitleNoMenu: string
  ItemChildCount: string
  FolderChildCount: string
  _ComplianceFlags: string
  _ComplianceTag: string
  _ComplianceTagWrittenTime: string
  _ComplianceTagUserId: string
}

interface RootLayoutProps {
  children: React.ReactNode
}
/* eslint-disable turbo/no-undeclared-env-vars */

import { connect } from "@/lib/mongodb"
import { getSpAuthToken } from "@/lib/officegraph"
import { getValidGuestDomains } from "./profile/actions/onboarding"
import { https, httpsGetAll } from "@/lib/httphelper"
import { get } from "http"




const KEY = "configcache"
const DB = "magicbox"
export interface ConfigCache {
  date: Date
  key: string
  hostdata: Fields
}

export async function readConfigData(key:string,hostname:string) {
  
  const defaultConfig : ConfigCache = {
    date: new Date(),
    key,
    hostdata:{
      "@odata.etag": "",
      Title: "Unknown host",
      LinkTitle: "",
      TrackingCode: `
            
      (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "ixwytyo6af");
`,
      id: "",
      ContentType: "",
      Modified: "",
      Created: "",
      AuthorLookupId: "",
      EditorLookupId: "",
      _UIVersionString: "",
      Attachments: false,
      Edit: "",
      LinkTitleNoMenu: "",
      ItemChildCount: "",
      FolderChildCount: "",
      _ComplianceFlags: "",
      _ComplianceTag: "",
      _ComplianceTagWrittenTime: "",
      _ComplianceTagUserId: ""
    }
  }
  const accessToken = await getSpAuthToken()
  const getHostResponse = await httpsGetAll<Value>(accessToken, 
  `https://graph.microsoft.com/v1.0/sites/christianiabpos.sharepoint.com:/sites/intra365:/lists/Hosts/items?$expand=fields`);

  if (getHostResponse.hasError) {
    console.log("Error getting hosts",getHostResponse.errorMessage)
    return defaultConfig;
  }

  const hostdata =  (getHostResponse.data ?? []).find((host : Value) => host.fields.Title.toLowerCase() === hostname.toLowerCase())




  const cache: ConfigCache = {
    date: new Date(),
    key,
    hostdata : hostdata?.fields ?? defaultConfig.hostdata
  }
  return cache
}
export async function refreshConfigCache(key:string,hostname:string) {
  console.log("Refreshing Config cache")
  const client = await connect()
  const cache = await readConfigData(key,hostname)

  await client
    .db(DB)
    .collection<ConfigCache>("cache")
    .deleteMany({ key })

  await client
    .db(DB)
    .collection<ConfigCache>("cache")
    .insertOne(cache)

  await client.close()
  return cache
}

export async function getConfigCache(host:string) {
  
  const client = await connect()
  const key = KEY + ":" + host
  let cache = await client
    .db(DB)
    .collection<ConfigCache>("cache")
    .findOne({ key })

  if (cache) {
    const now = new Date()
    const diff = now.getTime() - cache.date.getTime()
    const diffInMinutes = Math.round(diff / 60000)
    if (diffInMinutes > 1) {
      await refreshConfigCache(key,host)
      cache = await client
        .db(process.env.DATABASE)
        .collection<ConfigCache>("cache")
        .findOne({ key })
    }
  } else {
    await refreshConfigCache(key,host)
    cache = await client
      .db(process.env.DATABASE)
      .collection<ConfigCache>("cache")
      .findOne({ key })
  }

  await client.close()
  return cache
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const headersList = headers()
  const config = await getConfigCache(headersList.get("host")??"unknown")

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script id="magicpot-clarity">
            {config?.hostdata.TrackingCode}
          </Script>


        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" >
            <NextAuthProvider>
              <MagicboxProvider>
                {children}
              </MagicboxProvider>
            </NextAuthProvider>
          </ThemeProvider>

          <NewYorkToaster />
          <DefaultToaster />
          <TailwindIndicator />
        </body>
      </html>
    </>
  )
}
