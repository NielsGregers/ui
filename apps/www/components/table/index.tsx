

import { action } from "@/app/powershell/exchange/rooms/actions/deleteroom"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { GenericTableActions } from "./components/GenericTableActions"

import ToSmall from "@/components/tosmall"
import { GenericItem } from "./data/schema"

export interface GenericTableProps {
  data: any,
  actions? : GenericTableActions<GenericItem>
}

export  function GenericTable(params :  GenericTableProps
) {
  return (
    <>
      <ToSmall />
      <div className="hidden h-full flex-1 flex-col   md:flex">

        <DataTable data={params.data} columns={columns} actions={params.actions} />
      </div>
    </>
  )
}
