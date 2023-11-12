import "@/styles/globals.css"



import { SiteFooter } from "@/components/magicbox-site-footer"
import { SiteFooter as LocalSiteFooter } from "./components/site-footer"
import { SiteHeader } from "@/app/koksmat/[tenant]/[site]/components/site-header"

import { MagicBar } from "@/app/magicbox/components/tools"
import { KoksmatContext } from "./koksmatcontext"
import { useContext } from "react"
import { KoksmatToolBar } from "./components/toolbar"
interface RootLayoutProps {
  children: React.ReactNode,
  params: { site: string, tenant: string }
}

export default function RootLayout({ children, params }: RootLayoutProps) {

  return (

    <div>
      <SiteHeader site={params.site} tenant={params.tenant} />

      <div className="flex">
        <KoksmatToolBar />
        <div className="grow" >

          <div className="flex-1">{children}</div>
          <LocalSiteFooter />

        </div>
      </div>
    </div>
  )
}
