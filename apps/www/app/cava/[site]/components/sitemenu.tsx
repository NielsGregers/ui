"use client"


import * as React from "react"
import { useContext } from "react"
import { CavaContext } from "../cavacontext"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
export function SiteMenu(props: {site: string}){
    const {hasRole} =  useContext(CavaContext) 
    if (!hasRole("feature.toolbar")) return null
       
    return (
        <div >
      <MainNav  site={props.site}/>
        <MobileNav />
      </div>
    )
}

