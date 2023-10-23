"use client"

import React, { use, useEffect, useState } from "react"
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { addDays, format } from "date-fns"
import { ArrowUpDown, CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/default/ui/button"
import { Calendar } from "@/registry/default/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/registry/default/ui/table"
import { TableRow } from "@/registry/new-york/ui/table"

import {
  ParkingSpotBooking,
  getBookingsByDate,
} from "../../../actions/parking/parkingBookings"
import { DatePicker } from "./datepicker"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ParkingBooking = {
  parking: string
  user: string
  plates: string
}

export const columns: ColumnDef<ParkingSpotBooking>[] = [
  {
    accessorKey: "parking",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Parking Spot
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Booked By
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "plates",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Licence Plates
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No bookings for that day.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

interface PropsType {
  // data: ParkingBooking[]
}
export function ParkingBookingsTable(props: PropsType) {
  // const { data } = props
  const [date, setdate] = useState<Date>(new Date())
  const [bookings, setbookings] = useState<ParkingSpotBooking[]>([])

  useEffect(() => {
    async function load() {
      const result = await getBookingsByDate(date)
      setbookings(result)
    }

    load()
  }, [date])

  // setbookings(result)

  return (
    <div className="my-3 w-full">
      <div className="flex flex-row gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setdate(date as Date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          onClick={() => {
            setdate(new Date(addDays(date, -1)))
          }}
          variant="outline"
          className="bg-white dark:bg-black "
        >
          {"<"}
        </Button>
        <Button
          onClick={() => {
            setdate(new Date(addDays(date, 1)))
          }}
          variant="outline"
          className="bg-white dark:bg-black "
        >
          {">"}
        </Button>
      </div>
      <div className="flex items-center py-4">
        <DataTable data={bookings} columns={columns} />
      </div>
    </div>
  )
}
