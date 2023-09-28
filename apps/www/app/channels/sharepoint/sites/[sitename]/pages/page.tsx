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


  const [showSidepanel, setshowSidepanel] = useState(false)
  const [pageItems, setpageItems] = useState<GenericItem[]>([])


  React.useEffect(() => {

    const load = async () => {

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
            string1 += item.fields._ModernAudienceAadObjectIds.map((a) => a.LookupValue).join(", ")
          }


          const genericItem: GenericItem = {
            title: (item.fields.Title ?? "Missing title"),
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


  const col1: ColumnDef<GenericItem> = {
    id: "string1",
    accessorKey: "string1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Audience" />
    ),
    cell: ({ row }) => <div>{row.original.string1}</div>,
    enableSorting: true,
    enableHiding: true,
  }
  const col2: ColumnDef<GenericItem> = {
    id: "string2",
    accessorKey: "string2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Filename" />
    ),
    cell: ({ row }) => <div>{row.original.string2}</div>,
    enableSorting: true,
    enableHiding: true,
  }
  const col3: ColumnDef<GenericItem> = {
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
        <div className="flex-grow  bg-white">
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
               Different things that you can do with all pages
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
