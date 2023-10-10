"use client"

import { useContext, useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Document, WithId } from "mongodb"

import { GenericTable } from "@/components/table"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { GenericItem } from "@/components/table/data/schema"
import { Button } from "@/registry/new-york/ui/button"

import { UserWithProductInfo, readLicenses, snapshotLicenses } from "."
import { MagicboxContext } from "../magicbox-context"

const status: {
  loading: boolean
} = {
  loading: false,
}
export default function Licenses() {
  const magicbox = useContext(MagicboxContext)
  const [data, setdata] = useState<GenericItem<any>[]>([])
  const [numberOfItemsRead, setnumberOfItemsRead] = useState(0)
  const [isWorking, setisWorking] = useState(false)
  const [isloaded, setisloaded] = useState(false)
  const [errormessage, seterrormessage] = useState("")

  const refresh = async () => {
    if (status.loading) {
      console.log("Already working")
      return
    }
    status.loading = true
    var more: boolean = true
    var nextUrl: string = ""
    var token: string = ""
    const newSet: GenericItem<any>[] = []
    let countOfItemsRead = 0
    const snapshotToken = ""
    while (more) {
      const response = await snapshotLicenses(snapshotToken, token, nextUrl)
      if (response.hasError) {
        seterrormessage(response.errorMessage ?? "Unknown error")
        more = false
        return
      }
      countOfItemsRead += response.countOfItemsRead
      setnumberOfItemsRead(countOfItemsRead)

      if (response.nextLink) {
        nextUrl = response.nextLink
        token = response.accessToken ?? ""
      } else {
        more = false
        setisloaded(true)
        status.loading = false
      }
    }
  }

  useEffect(() => {
    const load = async () => {
    
      //return await refresh()
      const snapshotToken = ""

      const licenses = await readLicenses(snapshotToken)

      const users =
        licenses.map((user) => {
          const g: GenericItem<any> = {
            id: user.userPrincipalName,
            title: user.displayName + " (" + user.userPrincipalName + ") ",
            details: user.licenses
              .map((license) => license.Product_Display_Name)
              .join(","),
            link: `https://portal.azure.com/#view/Microsoft_AAD_UsersAndTenants/UserProfileMenuBlade/~/overview/userId/${user.id}/hidePreviewBanner~/true`,
            string1: user.lastSignInDateTime ?? "Unknown",
           
          }
          return g
        }) ?? []

      setdata(users.sort((a, b) => a.title.localeCompare(b.title)))
      setisloaded(true)
    }
    load()
  }, [])

  const col1: ColumnDef<GenericItem<any>> = {
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
            Licenses
          </h2>
        </div>
        <div className="">
          {errormessage && <div className="text-red-600">{errormessage}</div>}
          {!isloaded && <div>Loading ...</div>}

          {isloaded && <GenericTable data={data} addtionalColumns={[col1]} />}
        </div>
      </div>
    </div>
  )
}
