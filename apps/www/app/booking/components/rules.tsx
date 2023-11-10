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
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {/* <div>
            • The parking space can only be booked in advance and latest
            <span style={{ fontWeight: "bold" }}> until 4 p.m</span> of the
            current day when booking a spot{" "}
            <span style={{ fontWeight: "bold" }}>for the next day.</span>
          </div> */}
          <div>
            • All parking spots are numbered.
            <span style={{ fontWeight: "bold" }}>
              You have to park on the exact parking spot indicated by the
              application.
            </span>
          </div>
          <div>
            <span style={{ fontStyle: "italic" }}>
              • If somebody is parked on your spot,{" "}
            </span>{" "}
            please let us know by sending an email to{" "}
            <a
              style={{ color: "blue" }}
              href="mailto:nexibooking-cro@nexigroup.com"
            >
              nexibooking-cro@nexigroup.com
            </a>
            <span>
              {" "}
              so that we can ask them to move or that you can switch places and
              park on their spot.
            </span>
          </div>
          <div>
            • You will be able to book the spot for not longer than{" "}
            <span style={{ fontWeight: "bold" }}>2 days in advance.</span>
          </div>
          <div>
            •
            <span style={{ fontWeight: "bold" }}>
              DO NOT park on the spot that is not marked Nexi
            </span>{" "}
            unless the app gave you that spot. In case you do, you will be
            removed from the list of users and
            <span style={{ fontWeight: "bold" }}>
              {" "}
              permanently banned{" "}
            </span>{" "}
            from using the garage.
          </div>
          <div>
            • Currently, only internal employees with Zagreb as their primary
            work location can use the garage. Guests and external employees are
            not allowed to use the garage.
          </div>
          <div>
            • Next to the underground garage entrance, there is a parking for
            guests with payment option.
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Rules
