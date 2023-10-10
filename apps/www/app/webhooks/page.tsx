"use client"

import { useContext, useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Document, WithId } from "mongodb"

import { GenericTable } from "@/components/table"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { GenericItem } from "@/components/table/data/schema"
import { Button } from "@/registry/new-york/ui/button"

import { getExistingSubscriptions,  } from "."
import { MagicboxContext } from "../magicbox-context"

const status: {
  loading: boolean
} = {
  loading: false,
}
export default function Devices() {
  const magicbox = useContext(MagicboxContext)
  const [data, setdata] = useState<GenericItem<any>[]>([])
  const [numberOfItemsRead, setnumberOfItemsRead] = useState(0)
  const [isWorking, setisWorking] = useState(false)
  const [isloaded, setisloaded] = useState(false)
  const [errormessage, seterrormessage] = useState("")

 

  useEffect(() => {
    const load = async () => {
      //return await refresh()
      const snapshotToken = ""

      const subscriptionsResponse = await getExistingSubscriptions()
      if (subscriptionsResponse.hasError) {
        seterrormessage(subscriptionsResponse.errorMessage ?? "Unknown error")
        return
      }
      const subs =
        (subscriptionsResponse.data ?? []).map((subscription) => {
          const g: GenericItem<any> = {
            id: subscription.id,
            title: subscription.resource,
            details: subscription.changeType + " " + subscription.expirationDateTime,
           
            string1: "Unknown",
            
          }
          return g
        }) ?? []

      setdata(subs.sort((a, b) => a.title.localeCompare(b.title)))
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
            Webhooks
          </h2>
        </div>
        <div className="">
          {errormessage && <div className="text-red-600">{errormessage}</div>}
          {!isloaded && <div>Loading ...</div>}

          {isloaded && <GenericTable data={data} addtionalColumns={[]} />}

          
        </div>
      </div>
    </div>
  )
}
