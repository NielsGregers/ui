

import * as React from "react"
import Link from "next/link"


import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ForRole } from "@/components/roles"
import { NavigationRootLink } from "./NavigationRootLink"

export function MainNav() {
  

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/powershell" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          magicbox/powershell
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <ForRole role="Admin" module="PowerShellExchange">

          <NavigationRootLink name="Exchange" href="/powershell/exchange" />
        </ForRole>
        {/* <ForRole role="Admin" module="PowerShellSharePoint">
          <NavigationRootLink name="SharePoint" href="/powershell/sharepoint" />

        </ForRole>
        <ForRole role="Admin" module="PowerShellPowerApps">
          <NavigationRootLink name="PowerApps" href="/powershell/powerapps" />

        </ForRole> */}
        <ForRole role="Admin" module="PowerShell">
          <NavigationRootLink name="Admin" href="/powershell/admin" />

        </ForRole>

      </nav>
    </div>
  )
}

