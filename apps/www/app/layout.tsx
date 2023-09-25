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

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script id="magicpot-clarity">
            {`
            
          (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ixwytyo6af");
    `}
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
