import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/registry/new-york/ui/separator"
import { SidebarNav } from "./components/sidebar-nav"

import ToSmall from "@/components/tosmall"
import { SiteHeader } from "./components/site-header"


export const metadata: Metadata = {
  title: "Profile",
  description: "Here you can find profile informations",
}

const sidebarNavItems = (upn:string) => [
  {
    title: "Profile",
    href: `/profile/${upn}`,
  },
  {
    title: "Workplace",
    href: `/profile/${upn}/workplace`,
  },
  {
    title: "Appearance",
    href: `/profile/${upn}/appearance`,
  },
  {
    title: "Notifications",
    href: `/profile/${upn}/notifications`,
  },
  {
    title: "Display",
    href: `/profile/${upn}/display`,
  },
]

interface SettingsLayoutProps {
  upn:string,
  children: React.ReactNode,
  params: { upn: string }
}

export default async function SettingsLayout({ upn,children,params }: SettingsLayoutProps) {

  return (
    <>
    <ToSmall />
      <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container relative">
      <div className="mt-4 overflow-hidden rounded-[0.5rem] border bg-background shadow">
       <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
    
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems(params.upn)} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
        </div>
      </div>
      </div> 
      </div> 
     
    </>
  )
}
