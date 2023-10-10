"use client"

import * as React from "react"
import { useContext, useState } from "react"
import { useSearchParams } from "next/navigation"

import { https, httpsGetAll } from "@/lib/httphelper"
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {

  SitePage,
  getSiteCollection,
  getSitePages,
} from "../../../../../profile/data/officegraph"
import { Me } from "../../../../../profile/data/schemas"
import { SitepageCard } from "../../../../../magicbox/components/pagecard"
import { SharePointExtensionContext } from "../../../../../magicbox/usecasecontext"
import Link from "next/link"
import { GenericTable } from "@/components/table"
import { GenericItem } from "@/components/table/data/schema"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { MagicboxContext } from "@/app/magicbox-context"
import { ProfileCache } from "@/app/profile/data/cache"
import { getProfileData } from "."
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/new-york/ui/command"
import { cn } from "@/lib/utils"
import { LockClosedIcon } from "@radix-ui/react-icons"
import { CheckIcon } from "lucide-react"

export interface Root {
  "@odata.context": string
  "@microsoft.graph.tips": string
  value: Value[]
}

export interface Value {
  "@odata.etag": string
  createdDateTime: string
  eTag: string
  id: string
  lastModifiedDateTime: string
  webUrl: string
  createdBy: CreatedBy
  lastModifiedBy: LastModifiedBy
  parentReference: ParentReference
  contentType: ContentType
  "fields@odata.context": string
  fields: Fields
}

export interface CreatedBy {
  user: User
}

export interface User {
  displayName: string
  email?: string
  id?: string
}

export interface LastModifiedBy {
  user: User2
}

export interface User2 {
  displayName: string
  email?: string
  id?: string
}

export interface ParentReference {
  id: string
  siteId: string
}

export interface ContentType {
  id: string
  name: string
}

export interface Fields {
  "@odata.etag": string
  FileLeafRef: string
  Title?: string
  LinkTitle?: string
  _ModernAudienceAadObjectIds: ModernAudienceAadObjectId[]
  id: string
  ContentType: string
  Created: string
  AuthorLookupId: string
  Modified: string
  EditorLookupId: string
  _CheckinComment: string
  LinkFilenameNoMenu: string
  LinkFilename: string
  DocIcon?: string
  FileSizeDisplay?: string
  ItemChildCount: string
  FolderChildCount: string
  _ComplianceFlags: string
  _ComplianceTag: string
  _ComplianceTagWrittenTime: string
  _ComplianceTagUserId: string
  _CommentCount: string
  _LikeCount: string
  _DisplayName: string
  Edit: string
  _UIVersionString: string
  ParentVersionStringLookupId: string
  ParentLeafNameLookupId: string
  Description?: string
  CheckoutUserLookupId?: string
  _ModernAudienceTargetUserField?: ModernAudienceTargetUserField[]
}

export interface ModernAudienceAadObjectId {
  LookupId: number
  LookupValue: string
}

export interface ModernAudienceTargetUserField {
  LookupId: number
  LookupValue: string
  Email: string
}



export default function RootPage({ params }: { params: { sitename: string } }) {
  const { sitename } = params
  const magicbox = useContext(MagicboxContext)
  const searchParams = useSearchParams()

  const [error, seterror] = useState("")
  const [sitePath, setsitePath] = useState("")
  const [sharePointTenantName, setsharePointTenantName] = useState("")
  const [siteId, setsiteId] = useState("")
  const [sitePages, setsitePages] = useState<SitePage[]>([])
  const [profileData, setprofileData] = useState<ProfileCache>()

  const [showSidepanel, setshowSidepanel] = useState(false)
  const [pageItems, setpageItems] = useState<GenericItem[]>([])
  const [selectedChannels, setselectedChannels] = useState<string[]>([])

  React.useEffect(() => {

    const load = async () => {
      const pd = await getProfileData()
      if (pd) {
        setprofileData(pd)
      }
      const token = magicbox.session?.accessToken ?? ""
      if (token) {
        const searchResponse = await httpsGetAll<Value>(token, `https://graph.microsoft.com/v1.0/sites/christianiabpos.sharepoint.com:/sites/${sitename}:/lists/Site Pages/items?$expand=fields`)
        if (searchResponse.hasError) {
          seterror(searchResponse.errorMessage ?? "unknown error")
          return
        }
        setpageItems((searchResponse?.data ?? []).sort((a, b) => (a.fields.Title ?? "").localeCompare(b.fields?.Title ?? "")).map((item) => {

          let string1 = ""
          if (item.fields._ModernAudienceAadObjectIds) {
            string1 += item.fields._ModernAudienceAadObjectIds.map((a) => {
            const groupId = a.LookupValue.replace("{","").replace("}","").toLowerCase()
             const channel = pd?.channels.find(channel=>channel.GroupId===groupId)
             
              return channel?.channelName ?? ("Unknown channel " + groupId)
            }).join(", ")
          }
          let translatedTo = ""
          const s1 = item.webUrl.toLowerCase().split("/sitepages/")
          if (s1.length>1) {
            const s2 = s1[1].split("/")
            if (s2.length>1) {
              translatedTo = s2[0]+ ": "
            }
          }
          


          const genericItem: GenericItem = {
            title: translatedTo + (item.fields.Title ?? "Missing title"),
            link: item.webUrl,
            details: item.fields.Description ?? "",
            id: item.id,
            string1,
            string2: item.fields.LinkFilename,
            string3: null
          }
          return genericItem
        }))
      
      }
    }
    load()
  }, [magicbox])


  const col1: ColumnDef<GenericItem<any>> = {
    id: "string1",
    accessorKey: "string1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Audience" />
    ),
    cell: ({ row }) => <div>{row.original.string1}</div>,
    enableSorting: true,
    enableHiding: true,
  }
  const col2: ColumnDef<GenericItem<any>> = {
    id: "string2",
    accessorKey: "string2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Filename" />
    ),
    cell: ({ row }) => <div>{row.original.string2}</div>,
    enableSorting: true,
    enableHiding: true,
  }
  const col3: ColumnDef<GenericItem<any>> = {
    id: "string3",
    accessorKey: "string3",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Other" />
    ),
    cell: ({ row }) => <div>{row.original.string3}</div>,
    enableSorting: true,
    enableHiding: true,
  }
  return (
    <div className="minh-screen h-screen w-screen  bg-white">
      <div className="container">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Pages - {sitename}
        </h3>
        {error && <div className="text-red-500">{error}</div>}
        <div className="grow  bg-white">
          <GenericTable data={pageItems} addtionalColumns={[col3, col2, col1]}
            actions={{
              filterComponent: (params) => {
                if (params) {
                  let x = 1
                }
                return (
                  <div className="flex">
                    <div className="grow"></div>
                    <div>


                      <Button
                        variant="outline"
                        onClick={() => {
                          setshowSidepanel(true)
                        }}
                      >
                        General Options

                      </Button>
                    </div>
                  </div>
                )
              },
              selectedItemsActionsComponent: (params) => {
                return (
                  <div>
                    {/* <Button variant="destructive"> Delete</Button> */}
                    {params.rows.length === 1 &&
                      params.rows[0].original.string1 === "New" && (<div></div>

                      )}
                    {params.rows.length > 1 && (
                      <Button
                        variant={"destructive"}
                        onClick={() => {
                          const items = params.rows.map((r) => {
                            return r.original
                          })
                          debugger
                        }}
                      >
                        Actions on many pages
                      </Button>
                    )}
                  </div>
                )
              },
            }}
          />


        </div>
        <Sheet open={showSidepanel} onOpenChange={setshowSidepanel} >
          <SheetContent>
            <div className="h-screen  bg-white ">
              <SheetHeader>
                <SheetTitle>Page Options</SheetTitle>
                <SheetDescription>
                 
                  <Command>
                        <CommandInput placeholder="Search channels..." />

                        <CommandEmpty>No channels found.</CommandEmpty>
                        {/* <CommandList className="h-vh "> */}
                        <div className="h-[500px] overflow-scroll" >
                          {profileData?.categories
                            .sort((a, b) => a.sortOrder - b.sortOrder)
                            .map((category, key) => {
                              return (
                                <CommandGroup
                                  key={key}
                                  heading={category.categoryName}
                                >
                                  {profileData?.channels
                                    .filter(
                                      (i) =>
                                        i.NewsCategoryId === category.categoryId
                                    )
                                    .sort((a, b) => {
                                      if (
                                        a.sortOrder.toLowerCase() <
                                        b.sortOrder.toLowerCase()
                                      ) {
                                        return -1
                                      }
                                      if (
                                        a.sortOrder.toLowerCase() >
                                        b.sortOrder.toLowerCase()
                                      ) {
                                        return 1
                                      }
                                      return 0
                                    })
                                    .map((channel) => (
                                      <CommandItem
                                        value={channel.channelName}
                                        key={channel.channelCode}
                                        onSelect={(value) => {
                                          if (channel.Mandatory) return

                                          let newvalue = []
                                          if (
                                            selectedChannels.includes(
                                              channel.channelName
                                            )
                                          ) {
                                            newvalue =  selectedChannels.filter(
                                              (i) => i !== channel.channelName
                                            )
                                          } else {
                                            newvalue = [
                                              ...( selectedChannels ?? []),
                                              channel.channelName,
                                            ]
                                          }
                                          setselectedChannels(newvalue)
                                        }}
                                      >
                                        {channel.Mandatory && (
                                          <LockClosedIcon
                                            className={"mr-2 h-4"}
                                          />
                                        )}
                                        {!channel.Mandatory && (
                                          <CheckIcon
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              selectedChannels.includes(
                                                channel.channelName
                                              )
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        )}
                                        {channel.channelName}
                                      </CommandItem>
                                    ))}
                                </CommandGroup>
                              )
                            })}
                            </div>
                            <Button className="mt-5">Update</Button>
                        {/* </CommandList> */}
                      </Command>
                </SheetDescription>
              </SheetHeader>
              <div >

              </div>
            </div>
          </SheetContent>
        </Sheet>
        <pre></pre>
      </div>
    </div>
  )
}
