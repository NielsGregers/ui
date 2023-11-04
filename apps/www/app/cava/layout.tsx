import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import { SiteFooter } from "@/components/magicbox-site-footer"
import { SiteFooter as LocalSiteFooter } from "./[site]/components/site-footer"
import { SiteHeader } from "@/app/cava/[site]/components/site-header"

import { MagicBar } from "@/app/magicbox/components/tools"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {



  return (
<div>
<SiteHeader /> 

  <div className="flex">

 <div className=" w-[64px] border-r border-gray-400">
  <div className="sticky top-[48px]">
  <MagicBar  />
  </div>
</div> 
    <div className="grow" >
    
      <div className="flex-1">{children}</div>
      <LocalSiteFooter />
      <SiteFooter />
    </div>
    </div>
    </div>
  )
}
