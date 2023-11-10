

import * as React from "react"
import Link from "next/link"


import { siteConfig } from "../config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ForModule, ForRole } from "@/components/roles"
import { NavigationRootLink } from "./NavigationRootLink"
import Logo from "@/components/logo"
import { NavigationMenuCava } from "./cavamenu"
import Image from "next/image"
import { Tool } from "@/app/magicbox/components/tools"
import { useContext } from "react"
import { KoksmatContext } from "../koksmatcontext"
export function MainNav(props: { site: string,tenant?:string }) {
  const {hasRole} =  useContext(KoksmatContext) 

  return (
    <div className="mr-4 hidden md:flex">
      {/* <div className="ml-[64px]"><Logo homeUrl={siteConfig.root} /></div> */} 
      <div className="h-[64px] w-[64px] bg-slate-900">
      <Tool standalone noTopMargin link={`/koksmat`} displayName={""} script={""} iconUrl={"/koksmat/koksmat Icon.png"} openIn={"Same page"}></Tool>
      </div>
     
      <nav className="flex items-center space-x-6 text-sm font-medium">
      {hasRole("feature.toolbar") &&
      <NavigationMenuCava site={props.site} tenant={props.tenant??""} />}

      </nav>
    </div>
  )
}

