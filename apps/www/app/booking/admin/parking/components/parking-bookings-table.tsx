"use client"

import { use, useEffect, useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/registry/default/ui/table"
import { TableRow } from "@/registry/new-york/ui/table"

import { getBookingsByDate } from "../../../actions/parking/parkingBookings"
import { DatePicker } from "./datepicker"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ParkingBooking = {
  title: string
  userEmail: string
  plates: string
}

export const columns: ColumnDef<ParkingBooking>[] = [
  {
    accessorKey: "title",
    header: "Parking spot",
  },
  {
    accessorKey: "userEmail",
    header: "Booked By",
  },
  {
    accessorKey: "plates",
    header: "Licence plates",
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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
  const [bookings, setbookings] = useState<ParkingBooking[]>([])

  useEffect(() => {
    async function load() {
      const result = await getBookingsByDate(
        date?.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      )
      setbookings(result)
    }

    load()
  }, [date])

  // setbookings(result)

  return (
    <div className="my-3 w-full">
      <DatePicker
        currentDate={new Date()}
        onDateChanged={(date) => {
          setdate(date)
        }}
      />
      <div className="flex items-center py-4">
        <DataTable data={bookings} columns={columns} />
      </div>
    </div>
  )
}
