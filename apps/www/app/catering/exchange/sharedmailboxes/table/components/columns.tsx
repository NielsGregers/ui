"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/registry/new-york/ui/badge"
import { Checkbox } from "@/registry/new-york/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { SharedMailboxListItem } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<SharedMailboxListItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "primarysmtpaddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mail" />
    ),
    cell: ({ row }) => <div className="max-w-[300px] truncate font-medium">{row.getValue("primarysmtpaddress")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "exchangeobjectid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exchange Object ID" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      

      return (
        <div className="flex space-x-2">
       
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue( "exchangeobjectid")}
          </span>
        </div>
      )
    },
  },
  
  
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
