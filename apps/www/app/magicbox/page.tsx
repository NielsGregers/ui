"use client"

import * as React from "react"
import { useContext, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { https } from "@/lib/httphelper"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  SitePage,
  getSiteCollection,
  getSitePages,
} from "../profile/data/officegraph"
import { Me } from "../profile/data/schemas"
import { SharePointExtensionContext } from "./usecasecontext"
import { copyPage } from "./actions/pages"
import { setConfig } from "next/config"
import { ArchiveRestoreIcon, CopyIcon,EditIcon, PenToolIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { LegacyPageContext } from "./data/sharepoint-extention"

export default function RootPage() {
  const context = useContext(SharePointExtensionContext)
  const searchParams = useSearchParams()
  const [token, settoken] = useState(
    searchParams ? searchParams.get("token") : ""
  )
  const [parentLocation, setparentLocation] = useState(
    searchParams ? searchParams.get("href") : ""
  )
  const [me, setMe] = useState<Me>()
  const [sitePath, setsitePath] = useState("")
  const [sharePointTenantName, setsharePointTenantName] = useState("")
  const [siteId, setsiteId] = useState("")
  const [sitePages, setsitePages] = useState<SitePage[]>([])
  const [resolveduser, setresolveduser] = useState()
  const [sourceUrl, setsourceUrl] = useState("")
  const [copying, setcopying] = useState(false)
  const [newPageUrl, setnewPageUrl] = useState("")
  const [errorMessage, seterrorMessage] = useState("")
  const [legacyPageContext, setlegacyPageContext] = useState<LegacyPageContext>()

  const { setTheme } = useTheme()
  React.useEffect(() => {
    setTheme("transparent")
    return () => {
      setTheme("light")
    }
 
 }, [])
 

  React.useEffect(() => {
    const load = async () => {
      const res = await https<Me>(
        token ?? "",
        "GET",
        "https://graph.microsoft.com/v1.0/me"
      )
      if (!res.hasError) {
        setMe(res.data)
      }
    }
    if (token) {
      context.settoken(token)
      context.setparentlocation(parentLocation?.split("?")[0] ?? "")
      load()
    }
  }, [token, parentLocation])

  React.useEffect(() => {
    const load = async () => {
      const res = await getSiteCollection(
        token || "",
        sharePointTenantName,
        sitePath
      )

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
    type MessageTypes = "ensureuser" | "closemagicbox" | "resolveduser" | "context"
    interface Message {
      type: MessageTypes
      messageId: string
      str1: string
    }
    const handler = async (
      ev: MessageEvent<{ type: MessageTypes; data: any }>
    ) => {
      console.log("ev", ev)

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
            
            case "context":
              
              const context = JSON.parse(m.data)
              setlegacyPageContext(context)
              break
              

            

          default:
            break
        }
        //setmessage(ev.data.message)
      } catch (error) {
        console.log("ERROR", error)
      }
    }

    window.addEventListener("message", handler)

    window.parent.postMessage(
      {
        type: "context",
        data: "",
      },
      "*"
    )
    // Don't forget to remove addEventListener
    return () => window.removeEventListener("message", handler)
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

  const onCopyPage = async () => {
    setcopying(true)
    const destSiteUrl = context.parentlocation.split("/SitePages")[0]
    const copyPageResult = await copyPage(sourceUrl,destSiteUrl)
    setcopying(false)
    if (copyPageResult.hasError) {
      seterrorMessage(copyPageResult.errorMessage ?? "Unknown error")
      return
    }
    setnewPageUrl(copyPageResult.data?.newpageurl ?? "")

  }

  return (
    <div className="h-screen w-screen">
      <div className="flex h-screen flex-row">
        <div className="flex-grow bg-transparent blur-md"></div>
        <div className="w-[500px] bg-gray-200 transition-transform delay-150 ease-in-out">
          <div className="m-4 overflow-scroll ">
   
            <div>
Options

              </div>
            <div className="p-3">
              <Button
                variant="link"
                onClick={() => {
                  window.parent.postMessage(
                    {
                      type: "closemagicbox",
                      data: "",
                    },
                    "*"
                  )
                }}
              >
                  <ArchiveRestoreIcon/>&nbsp;
                Restore Standard SharePoint navigation
              </Button>
            </div>
            {/* <div className="p-3">
              <Button variant="default">
                <Link href={`/magicbox/sitepages${legacyPageContext?.siteServerRelativeUrl}`}>Pages</Link>
              </Button>
            </div>
            <div className="p-3">
              <Button variant="default">
                <Link href={`/magicbox/usecase/search`}>Search</Link>
              </Button>
            </div> */}
            {legacyPageContext && legacyPageContext.isSiteOwner && 
            <div>
              <div>
Site owner options

              </div>
              {/* <div className="p-3">
              <Button variant="link"  className=""
                onClick={() => {
                  const newUrl = legacyPageContext.multiGeoInfo[0]?.RootSiteUrl + legacyPageContext.serverRequestPath.substring(1) + "?mode=edit"
                  window.parent.postMessage(
                    {
                      type: "closemagicbox",
                      data: "",
                    },
                    "*"
                  )
                  window.open(newUrl, "_blank")
                }}
              >
                <PenToolIcon/>&nbsp;Edit
              </Button>
            </div> */}
            <div className="p-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link"  className="">
                    <CopyIcon/>&nbsp;
                    Copy Page
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Copy Page</DialogTitle>
                    <DialogDescription>
                   Find the URL of the page that you like to have a copy of.
                  </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 ">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Source URL 
                      </Label>
                      <Input
                        value={sourceUrl}
                        onChange={(e) => {
                          setsourceUrl(e.target.value)
                        }}
                        id="name"
                        className="col-span-3"
                      />
                    </div>
                   
                  </div>
                  <DialogFooter>
                    {copying && <div>Copying... Expect 5-15 seconds delay</div>}
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    {newPageUrl && <div>
                    <Button type="button" ><Link href={newPageUrl} target="_blank">Open new page</Link> </Button>
                    </div>}
                    {!copying && !newPageUrl && 
                    <Button type="button" disabled={sourceUrl===""} onClick={()=>onCopyPage()}>Copy</Button>}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              </div>
              <div className="hidden p-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link"  className="">
                    <CopyIcon/>&nbsp;
                    Copy Library
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Copy Page</DialogTitle>
                    <DialogDescription>
                   Find the URL of the page that you like to have a copy of.
                  </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 ">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Source URL 
                      </Label>
                      <Input
                        value={sourceUrl}
                        onChange={(e) => {
                          setsourceUrl(e.target.value)
                        }}
                        id="name"
                        className="col-span-3"
                      />
                    </div>
                   
                  </div>
                  <DialogFooter>
                    {copying && <div>Copying... Expect 5-15 seconds delay</div>}
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    {newPageUrl && <div>
                    <Button type="button" ><Link href={newPageUrl} target="_blank">Open new page</Link> </Button>
                    </div>}
                    {!copying && !newPageUrl && 
                    <Button type="button" disabled={sourceUrl===""} onClick={()=>onCopyPage()}>Copy</Button>}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              </div>
              <div className="hidden p-3">
<Link href="https://clarity.microsoft.com/projects/view/iwgs4fzf64/dashboard?date=Last%203%20days" target="_blank">
<Button>
  Insights
</Button>
</Link>

              </div>
            </div>
            
            
            
            }

          
          </div>{" "}
        </div>
      </div>
    </div>
  )
}
