"use client"

import { useContext, useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { format,differenceInMilliseconds } from "date-fns"
import { Document, WithId } from "mongodb"

import { GenericTable } from "@/components/table"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { GenericItem } from "@/components/table/data/schema"
import { Button } from "@/registry/new-york/ui/button"
import { MagicboxContext } from "@/app/magicbox-context"

import { runEventCacheSummaryAggregation } from "."
import { ViewHTML } from "./ViewHTML"

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

  const refresh = async () => {
    const snapshotToken = ""

    const eventSummary = await runEventCacheSummaryAggregation()

    const subs =
      (eventSummary ?? []).sort((a,b)=> differenceInMilliseconds(b.eventdate, a.eventdate)).map((summary) => {
    
        const g: GenericItem<any> = {
          id: summary.id,
          title: format(summary.start, "yyyy-MM-dd HH:mm") + " to " +  format(summary.end, "HH:mm ") + " "+summary.organizer,
          details: summary.changetype  ,
          link: summary.weblink,
          string1: summary.cavaid,
          string2: summary.body,
          string3:  format(summary.eventdate, "yyyy-MM-dd HH:mm"),
        }
        return g
      }) ?? []

    setdata(
      subs
    )
    setisloaded(true)
  }

  useEffect(() => {
    refresh()
  }, [])
  const col3: ColumnDef<GenericItem<any>> = {
    id: "string3",
    accessorKey: "string3",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event date" />
    ),
    cell: ({ row }) => <div>{format(new Date(row.original.string3 ?? ""),"yyyy.MM.dd HH:mm:ss")}</div>,
    enableSorting: true,
    enableHiding: true,
  }
  const col1: ColumnDef<GenericItem<any>> = {
    id: "string1",
    accessorKey: "string1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cava Order" />
    ),
    cell: ({ row }) => <div>{row.original.string1}</div>,
    enableSorting: true,
    enableHiding: true,
  }
  const col2: ColumnDef<GenericItem<any>> = {
    id: "string2",
    accessorKey: "string2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Body" />
    ),
    cell: ({ row }) => (
      <div>
        <ViewHTML html={row.original.string2 ?? ""} />
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  }

  return (
    <div className="minh-screen w-full">
      <div className="container p-8">
        <div className="">
          {errormessage && <div className="text-red-600">{errormessage}</div>}
          {!isloaded && <div>Loading ...</div>}

          {isloaded && (
            <GenericTable
              caption="Webhooks Events"
              description="List the last 1000 events"
              data={data}
              addtionalColumns={[col3,col1, col2]}
              actions={{
                generalActionsComponent: () => {
                  return (
                    <div>
                      <Button
                        variant={"secondary"}
                        onClick={async () => {
                          setisloaded(false)
                          setdata([])
                          await refresh()
                        }}
                      >
                        Refresh
                      </Button>
                    </div>
                  )
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
