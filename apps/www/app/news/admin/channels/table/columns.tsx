"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/registry/new-york/ui/badge"
import { Checkbox } from "@/registry/new-york/ui/checkbox"

import { labels, priorities, statuses } from "./data"
import { RoomsListItem } from "./schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns : ColumnDef<RoomsListItem>[] = [
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
  { id:"title",
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => <div className="max-w-[300px] truncate font-medium">{row.original.title}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  // {id:"provisioningstatus",
  //   accessorKey: "provisioningstatus",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  // },
  //   enableSorting: true,
  //   enableHiding: true,
  //   cell: ({ row }) => {
      

  //     return (
  //       <div className="flex space-x-2">
       
  //         <span className="max-w-[500px] truncate font-medium">
  //           {row.original.provisioningstatus}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "created_at",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Cretaed" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: true,
  //   cell: ({ row }) => {
      

  //     return (
  //       <div className="flex space-x-2">
       
  //         <span>
  //           {row.original.created_at.toLocaleString()}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "deviceserialnumber",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Device Serial Number" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: true,
    
  //   cell: ({ row }) => {
      

  //     return (
  //       <div className="flex space-x-2">
       
  //         <span>
  //           {row.original.deviceserialnumber}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  
  // {
  //   accessorKey: "ciscovideo",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Cisco Device" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: true,
    
  //   cell: ({ row }) => {
      

  //     return (
  //       <div className="flex space-x-2">
       
  //         <span>
  //           {row.original.ciscovideo}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  
  // {
  //   accessorKey: "restrictedto",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Restricted tp" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: true,
    
  //   cell: ({ row }) => {
      

  //     return (
  //       <div className="flex space-x-2">
       
  //      <span className="max-w-[300px] truncate font-medium">
  //           {row.original.restrictedto}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  
  // {
  //   accessorKey: "teamsmeetingroom",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Teams Meeting Room" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: true,
    
  //   cell: ({ row }) => {
      

  //     return (
  //       <div className="flex space-x-2">
       
  //         <span>
  //           {row.original.teamsmeetingroom}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  
  // {
  //   accessorKey: "production",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Production" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: true,
    
  //   cell: ({ row }) => {
      

  //     return (
  //       <div className="flex space-x-2">
       
  //         <span>
  //           {row.original.production}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions  row={row} />,
  },
]


export const getColumns = () : ColumnDef<RoomsListItem>[] => {
  return columns
}