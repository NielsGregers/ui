"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"

import { schema } from "./schema"

import { useContext } from "react";

interface DataTableRowActionsProps<TData> {

  row: Row<TData>
}

export function DataTableRowActions<TData>({

  row,
}: DataTableRowActionsProps<TData>) {


  const room = schema.parse(row.original)

  return (
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {/* <DropdownMenuItem>View</DropdownMenuItem>

        <DropdownMenuSeparator /> */}

        {/* {room.provisioningstatus === "Provision" &&
          <DropdownMenuItem onClick={()=>alert("not implemented")} className="cursor-pointer">
           Provision 
           
          </DropdownMenuItem>
        }     
        {(room.provisioningstatus === "Delete" || room.provisioningstatus === "Provisioned") &&
          <DropdownMenuItem onClick={()=>alert("not implemented")} className="cursor-pointer">
            Delete
            
          </DropdownMenuItem>} */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
