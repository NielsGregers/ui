"use client"

import React, { useContext, useState } from "react"
import { Car } from "lucide-react"
import { boolean } from "zod"

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
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import { UsecaseContext } from "@/app/booking/usecasecontext"

import { LicencePicker } from "./licenceplate-picker"

function BookParkingButton(params: { date: Date }) {
  const [isopen, setisopen] = useState<boolean>(false)
  const [plates, setPlates] = useState<string>("")
  const { date } = params
  const usecases = useContext(UsecaseContext)

  const platesChanged = (plates: string) => {
    setPlates(plates)
  }

  return (
    <Dialog open={isopen} onOpenChange={() => setisopen(!isopen)}>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          variant="outline"
          //   onClick={() => setisopen(true)}
        >
          <Car className="mr-2 h-4 w-4" />
          Reserve parking
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Book for{" "}
            {date?.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}
        <LicencePicker
          onPlatesChange={platesChanged}
          allPlates={["ZG12345TT", "ST54321AB"]}
        />
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              usecases.BookParkingSlot(
                date?.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }),
                "",
                "karlo.mrakovcic@nexigroup.com",
                plates
              )
              setisopen(false)
            }}
          >
            Book
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookParkingButton
