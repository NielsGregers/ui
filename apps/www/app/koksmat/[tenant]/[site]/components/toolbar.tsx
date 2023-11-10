"use client"

import { MagicBar } from "@/app/magicbox/components/tools"
import * as React from "react"
import { useContext } from "react"
import { KoksmatContext } from "../koksmatcontext"
export function KoksmatToolBar(){
    const {hasRole} =  useContext(KoksmatContext) 
    if (!hasRole("feature.toolbar")) return null
       
    return (
        <div className="mr-4 hidden md:flex">
        <div className=" w-[64px] border-r border-gray-400">
          <div className="sticky top-[64px]">
            <MagicBar toolbarId={1}/>
          </div>
        </div>
      </div>
    )
}

