"use client"

import React, { useContext } from "react"
import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/registry/default/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu"
import { UsecaseContext } from "@/app/booking/usecasecontext"

import { ParkingSpot } from "./parking-dashboard"

interface DataTableRowActionsProps {
  row: Row<ParkingSpot>
}

export function RowActions({ row }: DataTableRowActionsProps) {
  const spot = row.original
  const usecases = useContext(UsecaseContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions {spot.title}</DropdownMenuLabel>
        {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 hover:text-red-800"
          onClick={() => {
            usecases.DeleteParkingSlot(spot.id)
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
