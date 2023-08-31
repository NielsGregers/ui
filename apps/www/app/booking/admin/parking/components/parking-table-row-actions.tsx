"use client"

import React, { use, useContext, useState } from "react"
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
import { deleteParkingSpot } from "@/app/booking/actions/parking/parkingSpaces"
import { RouteKind } from "next/dist/server/future/route-kind"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/registry/default/ui/dialog"
import { DialogHeader } from "@/registry/new-york/ui/dialog"
import EditParkingForm from "./edit-parking-form"

interface DataTableRowActionsProps {
  row: Row<ParkingSpot>
}

function deleteParking (id: string) {
  deleteParkingSpot(id)
}

// Functions that return JSX are called components, they need to be capitalized to be recognized as such.
function EditDialog (props : {id:string}) {
  const [dialogOpen, setdialogOpen] = useState(true)

  return(
    <Dialog open={dialogOpen} onOpenChange={()=>setdialogOpen(!dialogOpen)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a parking spot</DialogTitle>
                {/* <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription> */}
              </DialogHeader>
              <EditParkingForm onClose={()=>setdialogOpen(false)} />
            </DialogContent>
          </Dialog>
  )
}

export function RowActions({ row }: DataTableRowActionsProps) {
  const [dialogOpen, setdialogOpen] = useState(false)
  const spot = row.original
  const router = useRouter()

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
        <DropdownMenuItem onClick={()=>{EditDialog({id:spot.id})}}>Edit</DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 hover:text-red-800"
          onClick={() => { deleteParkingSpot(spot.id); router.refresh()
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
