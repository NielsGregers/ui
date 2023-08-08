


import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/registry/new-york/ui/separator"
import { SidebarNav } from "@/app/shadcn/examples/forms/components/sidebar-nav"
import { ForModule } from "@/components/roles"
import  ToSmall  from "@/components/tosmall"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [

{
  title: "Pages",
  href: "/powershell/sharepoint/pages",

},


]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <ForModule module="PowerShellSharePoint">
        <ToSmall/>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">SharePoint Tasks</h2>
          <p className="text-muted-foreground">
            Run and monitor the executing of SharePoint related tasks
          </p>
        </div>
        <Separator className="my-6" />
        
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
      </ForModule>
  )
}


