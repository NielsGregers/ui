"use client"

import { useContext, useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Document, WithId } from "mongodb"

import { GenericTable } from "@/components/table"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { GenericItem } from "@/components/table/data/schema"
import { Button } from "@/registry/new-york/ui/button"

import { readDevices, snapshotDevices } from "."
import { MagicboxContext } from "../magicbox-context"

const status: {
  loading: boolean
} = {
  loading: false,
}
export default function Devices() {
  const magicbox = useContext(MagicboxContext)
  const [data, setdata] = useState<GenericItem[]>([])
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
    const newSet: GenericItem[] = []
    let countOfItemsRead = 0
    const snapshotToken = ""
    while (more) {
      const response = await snapshotDevices(snapshotToken, token, nextUrl)
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

      const devices = await readDevices(snapshotToken)

      const users =
        devices.map((user) => {
          const g: GenericItem = {
            id: user.id,
            title: user.displayName ?? "not named",
            details: user.model ?? "unknown model",
            link: `https://portal.azure.com/#view/Microsoft_AAD_Devices/DeviceDetailsMenuBlade/~/Properties/objectId/${user.id}/deviceId`,
            string1: "Unknown",
            string2: null,
            string3: null,
          }
          return g
        }) ?? []

      setdata(users.sort((a, b) => a.title.localeCompare(b.title)))
      setisloaded(true)
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
            Devices
          </h2>
        </div>
        <div className="">
          {errormessage && <div className="text-red-600">{errormessage}</div>}
          {!isloaded && <div>Loading ...</div>}

          {isloaded && <GenericTable data={data} addtionalColumns={[]} />}

          <textarea
            value={`"w5": [
    {
      "num": "#workstations with antivirus monitored",
      "den": "#total workstations"
    }
  ],
 
  "w6": [
    {
      "num": "#workstations with DLP monitored",
      "den": "#total workstations"
    }
  ],
 
  "w4": [
    {
      "num": "#workstations with anti-malware agent monitored",
      "den": "#total workstations"
    }
  ],
 
  "w3": [
    {
      "num": "#workstations protected by encryption tool",
      "den": "#total workstations"
    }
  ],
 
  "w2": [
    {
      "num": "#mobiles with active MDM segregation",
      "den": "#total mobiles"
    }
  ],
 
  "w8": [
    {
      "num": "#workstations with system software up to date at month -1",
      "den": "#total workstations"
    }
  ],
 
  "w7a": [
    {
      "num": "# users with USB enabled (with encryption)"
    }
  ],
 
  "w7b": [
    {
      "num": "# users with USB enabled (without encryption)"
    }
  ],
 
  "cs11": [
    {
      "num": "#SPAM Mail of previous month"
    }
  ]`}
          ></textarea>
        </div>
      </div>
    </div>
  )
}
