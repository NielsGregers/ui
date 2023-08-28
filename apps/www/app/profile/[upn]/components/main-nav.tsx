

import * as React from "react"
import Link from "next/link"


import { siteConfig } from "../config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ForModule, ForRole } from "@/components/roles"
import { NavigationRootLink } from "./NavigationRootLink"
import Logo from "@/components/logo"

export function MainNav() {
  

  return (
    <div className="mr-6 flex items-center space-x-2">
        <div >  
        <Logo homeUrl={siteConfig.root} />
        </div>
        <span className="ml-4 hidden font-bold sm:inline-block">
        {siteConfig.name}
        </span>
       
      
      {/* <Link href={siteConfig.root} className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
        {siteConfig.name}
        </span>
      </Link> */}
      <nav className="flex items-center space-x-6 text-sm font-medium">

       

      </nav>
    </div>
  )
}

