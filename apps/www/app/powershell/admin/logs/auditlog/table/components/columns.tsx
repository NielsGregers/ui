"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/registry/new-york/ui/badge"
import { Checkbox } from "@/registry/new-york/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { AuditLogItem } from "../data/schema"
import { DataTableColumnHeader } from "@/app/powershell/components/data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<AuditLogItem>[] = [
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
  { id:"created_at",
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date/time" />
    ),
    cell: ({ row }) => <div className="max-w-[300px] truncate font-medium">{row.original.created_at.toLocaleString()}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  
  {
    accessorKey: "appid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Caller" />
    ),
    enableSorting: true,
    enableHiding: true,
    
    cell: ({ row }) => {
      

      return (
        <div className="flex space-x-2">
       
          <span>
            {row.original.appid}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "haserror",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Has Error" />
    ),
    enableSorting: true,
    enableHiding: true,
    
    cell: ({ row }) => {
      

      return (
        <div className="flex space-x-2">
       
          <span>
            {row.original.haserror}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "scriptname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scriptname" />
    ),
    enableSorting: true,
    enableHiding: true,
    
    cell: ({ row }) => {
      

      return (
        <div className="flex space-x-2">
       
          <span>
            {row.original.scriptname}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "input",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Parameters" />
    ),
    enableSorting: true,
    enableHiding: true,
    
    cell: ({ row }) => {
      

      return (
        <div className="flex space-x-2">
       
          <span>
            {row.original.input}
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
