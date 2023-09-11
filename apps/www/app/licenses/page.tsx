"use client"

import { useContext, useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Document, WithId } from "mongodb"

import { GenericTable } from "@/components/table"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { GenericItem } from "@/components/table/data/schema"
import { Button } from "@/registry/new-york/ui/button"

import { UserWithProductInfo, readLicense } from "."
import { MagicboxContext } from "../magicbox-context"

export default function Licenses() {
  const magicbox = useContext(MagicboxContext)
  const [data, setdata] = useState<GenericItem[]>([])
  const [isloaded, setisloaded] = useState(false)
  const [errormessage, seterrormessage] = useState("")
  useEffect(() => {
    const load = async () => {
      var more: boolean = true
      var nextUrl: string = ""
      var token: string = ""
      const newSet: GenericItem[] = []
      while (more) {
        const response = await readLicense(token, nextUrl)
        if (response.hasError) {
          seterrormessage(response.errorMessage ?? "Unknown error")
          more = false
          return
        }
        const s =
          (response?.items ?? []).map((user) => {
            const g: GenericItem = {
              id: user.user.userPrincipalName,
              title:
                user.user.displayName +
                " (" +
                user.user.userPrincipalName +
                ") ",
              details: user.licenses
                .map((license) => license.Product_Display_Name)
                .join(","),
              link: `https://portal.azure.com/#view/Microsoft_AAD_UsersAndTenants/UserProfileMenuBlade/~/overview/userId/${user.user.id}/hidePreviewBanner~/true`,
              string1:
                user.user.signInActivity?.lastSignInDateTime ?? "Unknown",
              string2: null,
              string3: null,
            }
            return g
          }) ?? []

        newSet.push(...s)

        setdata(newSet.sort((a, b) => a.title.localeCompare(b.title)))
        if (response.nextLink) {
          nextUrl = response.nextLink
          token = response.accessToken ?? ""
        } else {
          more = false
          setisloaded(true)
        }
      }
    }
    load()
  }, [])

  const col1: ColumnDef<GenericItem> = {
    id: "string1",
    accessorKey: "string1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Sign in" />
    ),
    cell: ({ row }) => <div>{row.original.string1}</div>,
    enableSorting: true,
    enableHiding: true,
  }

  return (
    <div className="minh-screen w-full">
      <div className="container ">
        <div className="flex flex-wrap">
          <h2 className={"my-3 text-2xl font-bold leading-none tracking-tight"}>
            Licenses  {data.length} users
          </h2>
        </div>
        <div className="">
          {errormessage && <div className="text-red-600">{errormessage}</div>}
          {!isloaded && <div>Loaded {data.length} items</div>}
          <div className="flex">

            <div className="p-2">
          {data.filter((d) => d.string1 === "Unknown").length} never signed in
          </div>
         
          </div>
          <GenericTable data={data} addtionalColumns={[col1]} />
        </div>
      </div>
    </div>
  )
}
