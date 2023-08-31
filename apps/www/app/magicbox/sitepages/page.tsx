"use client"

import * as React from "react"
import { useContext, useState } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { https } from "@/lib/httphelper"
import { Me } from "../../profile/data/schemas"
import { SitePage, getSiteCollection, getSitePages } from "../../profile/data/officegraph"
import { SitepageCard } from "../components/pagecard"
import { SharePointExtensionContext } from "../usecasecontext"
export default function RootPage() {
  const context = useContext(SharePointExtensionContext)
  const searchParams = useSearchParams()
 

 
  const [sitePath, setsitePath] = useState("")
  const [sharePointTenantName, setsharePointTenantName] = useState("")
  const [siteId, setsiteId] = useState("")
  const [sitePages, setsitePages] = useState<SitePage[]>([])



  React.useEffect(() => {
    const load = async () => {
      const res = await getSiteCollection(context.token , sharePointTenantName, sitePath)

      if (!res.hasError) {
        setsiteId(res.data?.id ?? "")
      }
    }
    if (context.token && sharePointTenantName && sitePath) {
      load()
    }
  }, [sharePointTenantName, sitePath, context.token])

  React.useEffect(() => {
    // https://christianiabpos.sharepoint.com/sites/nexiintra-home?debug=true
    if (context.parentlocation) {
      const s = context.parentlocation.split(".sharepoint.com/")
      if (s.length > 1) {
        const tenant = s[0].replace("https://", "")
        const site = s[1].split("?")[0]
        setsitePath(site)
        setsharePointTenantName(tenant)
      }
    }
  }, [context.parentlocation])


  React.useEffect(() => {
    const load = async () => {
      const res = await getSitePages(context.token, siteId)

      if (!res.hasError && res.data) {
        setsitePages(res.data)
      }
    }
    if (siteId) {
      load()
    }
  }, [siteId])


  return (
    <div className="minh-screen w-screen  bg-white" >
      <div className="container">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      Pages
    </h3>
        <div className="flex-grow  bg-white">
  
            <div className="m-8 flex flex-wrap" >
              {sitePages.map((page) => (
                <SitepageCard
                  key={page.id}
                  page={page}
                  className="m-3 w-[250px] bg-white"
                  aspectRatio="portrait"
                  width={250}
                  height={330}
                />
              ))}
            </div>
   



        </div>

      </div>
    </div>
  )
}


