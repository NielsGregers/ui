"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/registry/new-york/ui/badge"
import { Checkbox } from "@/registry/new-york/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { AuditLogItem as GenericItem } from "../data/schema"
import { DataTableColumnHeader } from "@/app/powershell/components/data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<GenericItem>[] = [
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
  // { id:"created_at",
  //   accessorKey: "created_at",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Date/time" />
  //   ),
  //   cell: ({ row }) => <div className="max-w-[300px] truncate font-medium">{row.original.created_at.toLocaleString()}</div>,
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  {
    id: "title",
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => <div >{row.original.title}</div>,
    enableSorting: true,
    enableHiding: false,
  }, {
    id: "details",
    accessorKey: "details",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    cell: ({ row }) => <div >{row.original.details}</div>,
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions linkPrefix={row.original.link as string} row={row} />,
  },



]
