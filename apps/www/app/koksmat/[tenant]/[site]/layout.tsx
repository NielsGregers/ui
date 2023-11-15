import "@/styles/globals.css"
import { useContext, useEffect } from "react"
import { SiteHeader } from "@/app/koksmat/[tenant]/[site]/components/site-header"

import ClientLayout from "./clientlayout"
interface RootLayoutProps {
  children: React.ReactNode
  params: { site: string; tenant: string }
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const { tenant, site } = params
  return (
    <div>
      <SiteHeader site={site} tenant={tenant} />
      <ClientLayout site={site} tenant={tenant}>
        {children}
      </ClientLayout>
    </div>
  )
}
