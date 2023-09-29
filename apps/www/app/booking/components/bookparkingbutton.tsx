"use client"

import React, { use, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, MoreHorizontal } from "lucide-react"
import { BiHandicap } from "react-icons/bi"
import { BsFillEvStationFill } from "react-icons/bs"
import { FaParking } from "react-icons/fa"

import { Button } from "@/registry/default/ui/button"
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/registry/default/ui/dropdown-menu"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import { Switch } from "@/registry/default/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip"
import { useToast } from "@/registry/default/ui/use-toast"
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
  onDone: () => void
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
  const { toast } = useToast()

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
      toast({
        title: "Success",
        description:
          "You reserved a parking spot for " +
          date?.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
      })
      params.onDone()
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
              disabled={
                new Date(params.date.setHours(16, 0, 0, 0)) < new Date()
              }
              className="w-full rounded-full"
              variant="outline"
              //   onClick={() => setisopen(true)}
            >
              <FaParking className="mr-2 h-5 w-5" style={{ color: "blue" }} />
              {/* <Car className="mr-2 h-4 w-4" /> */}
              Reserve parking
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-black sm:max-w-[425px]">
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
                  <div className=" flex flex-row space-x-6 text-sm">
                    <div className="flex flex-row space-x-2 text-sm">
                      <Switch
                        className="checked:bg-green-700"
                        checked={EV}
                        onCheckedChange={() => setEV(!EV)}
                      />
                      <BsFillEvStationFill
                        className=" h-5 w-5 cursor-help"
                        style={{ color: "green" }}
                      />
                    </div>
                    <div className="flex flex-row space-x-2 text-sm">
                      <Switch
                        className="bg-white dark:bg-black"
                        checked={handicapped}
                        onCheckedChange={() => sethandicapped(!handicapped)}
                      />
                      <BiHandicap
                        className="h-5 w-5 cursor-help"
                        style={{ color: "blue" }}
                      />
                    </div>
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
                  disabled={plates === ""}
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
            <Button variant="secondary" className="w-full rounded-full">
              <FaParking className="mr-2 h-4 w-4" style={{ color: "blue" }} />
              {"Reserved: " + params.booking.parkingTitle}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-row justify-between">
                {params.booking?.plates.toUpperCase()}
                {params.booking?.EV && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <BsFillEvStationFill
                          className=" h-5 w-5 cursor-help"
                          style={{ color: "green" }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          This parking spot has access to EV charger you can use
                          free of charge
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {params.booking?.handicapped && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <BiHandicap
                          className="h-5 w-5 cursor-help"
                          style={{ color: "blue" }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This parking spot is handicapped accessible.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={
                new Date(params.date.setHours(12, 0, 0, 0)) < new Date()
              }
              className="text-red-700"
            >
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

export default BookParkingButton
