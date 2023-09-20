"use client"

import React, { use, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Car, ChevronDown, MoreHorizontal } from "lucide-react"
import { boolean } from "zod"

import { Button } from "@/registry/default/ui/button"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
import { Switch } from "@/registry/new-york/ui/switch"
import { UsecaseContext } from "@/app/booking/usecasecontext"

import {
  BookingConfirmationType,
  UserParkingBooking,
  newBooking,
} from "../actions/parking/parkingBookings"
import { getUserPlates } from "../actions/parking/user"
import { LicencePicker } from "./licenceplate-picker"

function BookParkingButton(params: {
  date: Date
  booking?: UserParkingBooking
  userEmail: string | undefined | null
}) {
  const [isopen, setisopen] = useState<boolean>(false)
  const [plates, setPlates] = useState<string>("")
  const [EV, setEV] = useState<boolean>(false)
  const [handicapped, sethandicapped] = useState<boolean>(false)
  const [result, setresult] = useState<BookingConfirmationType | undefined>(
    undefined
  )

  const { date, userEmail } = params
  const usecases = useContext(UsecaseContext)

  const platesChanged = (plates: string) => {
    setPlates(plates)
  }
  const router = useRouter()

  async function handleBooking() {
    const response = await newBooking(
      date?.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      userEmail ?? "",
      plates,
      EV,
      handicapped,
      0
    )

    if (response.success) {
      router.refresh()
      setisopen(false)
      router.refresh()
    } else {
      setresult(response)
    }
  }

  return (
    <>
      {!params.booking && (
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
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black">
            <DialogHeader>
              <DialogTitle>
                Reserve parking for{" "}
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
            <div className="grid space-y-2">
              {result === undefined && (
                <div className="grid space-y-3">
                  <LicencePicker
                    onPlatesChange={platesChanged}
                    userEmail={params.userEmail}
                  />
                  <div className="flex flex-row space-x-2 text-sm">
                    <Switch checked={EV} onCheckedChange={() => setEV(!EV)} />
                    <div>I want to charge my EV</div>
                  </div>
                  <div className="flex flex-row space-x-2 text-sm">
                    <Switch
                      className="bg-white dark:bg-black"
                      checked={handicapped}
                      onCheckedChange={() => sethandicapped(!handicapped)}
                    />
                    <div>I need a handicapped parking space</div>
                  </div>
                </div>
              )}
              {result?.cause === "No available parking slots for EV" && (
                <div className="w-full">
                  <div>{result.cause}</div>
                  <br />
                  <div>
                    Would you like to reserve a parking space without the
                    charger?
                  </div>
                  <br />

                  <div className="flex flex-row justify-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setisopen(false)}
                    >
                      No
                    </Button>
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => {
                        setEV(false)
                        handleBooking()
                      }}
                    >
                      Yes
                    </Button>
                  </div>
                </div>
              )}
              {result?.cause ===
                "No available parking slots for handicapped" && (
                <div className="w-full">
                  <div>
                    <pre>No available handicapped parking.</pre>
                    <pre>
                      Would you like to reserve a regular parking space?
                    </pre>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setisopen(false)}
                  >
                    No
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => {
                      sethandicapped(false)
                      handleBooking()
                    }}
                  >
                    Yes
                  </Button>
                </div>
              )}
              {result?.cause ===
                "No available parking slots for EV and handicapped" && (
                <>
                  <div>
                    <pre>No available handicapped parking with EV charger.</pre>
                    <pre>
                      Would you like to reserve a regular parking space?
                    </pre>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setisopen(false)}
                  >
                    No
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => {
                      setEV(false)
                      sethandicapped(false)
                      handleBooking()
                    }}
                  >
                    Yes
                  </Button>
                </>
              )}
            </div>
            <DialogFooter>
              {result === undefined && (
                <Button
                  type="submit"
                  onClick={() => {
                    handleBooking()
                  }}
                >
                  Book
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {params.booking && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="w-full">
              <Car className="mr-2 h-4 w-4" />
              {"Reserved: " + params.booking.parkingTitle}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Cancel</DropdownMenuItem>
            <DropdownMenuItem>Book another space</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

export default BookParkingButton
