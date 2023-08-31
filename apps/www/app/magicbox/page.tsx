"use client"

import * as React from "react"
import { useContext, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { https } from "@/lib/httphelper"
import { Me } from "../profile/data/schemas"
import { SitePage, getSiteCollection, getSitePages } from "../profile/data/officegraph"


import { SharePointExtensionContext } from "./usecasecontext"

export default function RootPage() {
  const context = useContext(SharePointExtensionContext)
  const searchParams = useSearchParams()
  const [token, settoken] = useState(searchParams ? searchParams.get("token") : "")
  const [parentLocation, setparentLocation] = useState(searchParams ? searchParams.get("href") : "")
  const [me, setMe] = useState<Me>()
  const [sitePath, setsitePath] = useState("")
  const [sharePointTenantName, setsharePointTenantName] = useState("")
  const [siteId, setsiteId] = useState("")
  const [sitePages, setsitePages] = useState<SitePage[]>([])
const [resolveduser, setresolveduser] = useState()
  React.useEffect(() => {
    const load = async () => {
      
      const res = await https<Me>(token ?? "", "GET", "https://graph.microsoft.com/v1.0/me")
      if (!res.hasError) {
        setMe(res.data)
      }
    }
    if (token) {
      context.settoken(token)
      context.setparentlocation(parentLocation ?? "")
      load()
    }
  }, [token,parentLocation])

  React.useEffect(() => {
    const load = async () => {
      const res = await getSiteCollection(token || "", sharePointTenantName, sitePath)

      if (!res.hasError) {
        setsiteId(res.data?.id ?? "")
      }
    }
    if (token && sharePointTenantName && sitePath) {
      load()
    }
  }, [sharePointTenantName, sitePath, token])

  React.useEffect(() => {
    // https://christianiabpos.sharepoint.com/sites/nexiintra-home?debug=true
    if (parentLocation) {
      const s = parentLocation.split(".sharepoint.com/")
      if (s.length > 1) {
        const tenant = s[0].replace("https://", "")
        const site = s[1].split("?")[0]
        setsitePath(site)
        setsharePointTenantName(tenant)
      }
    }
  }, [parentLocation])

// This hook is listening an event that came from the Iframe
React.useEffect(() => {
  type MessageTypes = "ensureuser" | "closemagicbox" | "resolveduser"
  interface Message {
    type: MessageTypes
    messageId:string
    str1: string
}
  const handler = async (ev: MessageEvent<{ type: MessageTypes, data: any }>) => {
      console.log('ev', ev)

      // if (typeof ev.data !== 'object') return
      // if (!ev.data.type) return
      // if (ev.data.type !== 'button-click') return
      
   
      let r 
      try {
          const m = ev.data
          switch (m.type) {
           
              case "resolveduser":
                setresolveduser(m.data?.LoginName)
                  break
              default:
                  break;
          }
          //setmessage(ev.data.message)
         
      } catch (error) {
          console.log("ERROR",error)
      }

  }

  window.addEventListener('message', handler)

  // Don't forget to remove addEventListener
  return () => window.removeEventListener('message', handler)
}, [])
  React.useEffect(() => {
    const load = async () => {
      const res = await getSitePages(token || "", siteId)

      if (!res.hasError && res.data) {
        setsitePages(res.data)
      }
    }
    if (siteId) {
      load()
    }
  }, [siteId])


  return (
    <div className="h-screen w-screen">
      <div className="flex h-screen flex-row">
        <div className="flex-grow bg-transparent">
  
            


        </div>
        <div className="w-[500px] bg-gray-200 transition-transform delay-150 ease-in-out">
          <div className="m-4 overflow-scroll ">
          {/* <div className="p-3">
             <Link href="/magicbox/sitepages">Pages</Link>
            </div> */}
            The sidebar is in a alpha state. So it is currently only providing 2 features.
            <div className="p-3">
              <Button variant="default" onClick={() => {
                window.parent.postMessage(
                  {
                    type: 'closemagicbox',
                    data: "",
                  },
                  '*'
                )

              }}>Restore Standard SharePoint navigation</Button>
            </div>
        

            <div className="p-3">
              <Dialog > 
                <DialogTrigger asChild>
                  <Button variant="default" disabled={!me}>Show Profile</Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Show profile</DialogTitle>
                    {/* <DialogDescription>
                    Make changes to your profile here. Click save when you are
                    done.
                  </DialogDescription> */}
                  </DialogHeader>
                  <div className="grid gap-4 py-4 ">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={me?.displayName ?? ""}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value={me?.userPrincipalName ?? ""}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>



          </div>{" "}
        </div>
      </div>
    </div>
  )
}


