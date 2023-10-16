import React from "react"
import { FaClipboardList } from "react-icons/fa"

import { Button } from "@/registry/default/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog"

function Rules() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <FaClipboardList className="mr-2 h-4 w-4" />
          Rules for booking
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Basic rules for booking</DialogTitle>
          <DialogDescription>
            Here are some basic rules for using the booking app to reserve
            parking in the building.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            • The parking space can only be booked in advance and latest
            <span style={{ fontWeight: "bold" }}> until 12.p.m</span> of the
            current day when booking a spot{" "}
            <span style={{ fontWeight: "bold" }}>for the next day.</span>
          </div>
          <div>
            • You will be able to book the spot for not longer than{" "}
            <span style={{ fontWeight: "bold" }}>2 days in advance.</span>
          </div>
          <div>
            • All parking spots are numbered, and you will be allowed to park{" "}
            <span style={{ fontWeight: "bold" }}>
              only on the parking spot indicated by the application.
            </span>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Rules
