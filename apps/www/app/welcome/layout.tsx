
import Link from "next/link";
import Logo from "@/components/logo";





import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/providers"
import { SiteFooter } from "@/components/magicbox-site-footer"
import { SiteHeader } from "@/app/powershell/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster as DefaultToaster } from "@/registry/default/ui/toaster"
import { Toaster as NewYorkToaster } from "@/registry/new-york/ui/toaster"
import { NextAuthProvider } from "../providers";
import { ForModule } from "@/components/roles";
import { UsercaseProvider } from "./usecaseproviders";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "shadcn",
      url: "https://shadcn.com",
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

export default function RootLayout({ children }: RootLayoutProps) {

  return (

    <UsercaseProvider >
      <div className="h-screen w-full bg-[url('/hard_blur.png')] bg-cover dark:bg-[url('/hard_blur_black.png')]">
        <div className="grid h-screen place-items-center">

          <div className="absolute left-8 top-4">
            <Logo homeUrl="/" />
          </div>
          <div >
            <div className="p-10">
              <div>

              </div>
              {children}
            </div>

          </div></div>
        <ForModule module="Developer">
          <SiteFooter />
        </ForModule>
      </div>
    </UsercaseProvider>


  )
}
