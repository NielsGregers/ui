import { docsConfig } from "../links"

import { ScrollArea } from "@/registry/new-york/ui/scroll-area"
import { GitSidebarNav } from "../sidebar-nav"
import { SiteHeader } from "../header"

interface DocsLayoutProps {
  children: React.ReactNode
  params: {
  tenant:string
  site:string
  workspace:string
  }
}

export default function DocsLayout({ children,params }: DocsLayoutProps) {
  const {tenant,site,workspace} = params
  return (
    <div className="border-b">

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
            <GitSidebarNav items={docsConfig(tenant,site,workspace).sidebarNav} />
          </ScrollArea>
        </aside>
        {children}
      </div>
    </div>
  )
}
