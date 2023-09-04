import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import { SiteFooter } from "@/components/magicbox-site-footer"
import { SiteFooter as LocalSiteFooter } from "./components/site-footer"
import { SiteHeader } from "@/app/cava/components/site-header"
import { CavaProvider } from "./cavacontextprovider"


interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
<CavaProvider>
    <div >
     <SiteHeader /> 
      <div className="flex-1">{children}</div>
      <LocalSiteFooter />
      <SiteFooter />
    </div>
    </CavaProvider>
  )
}
