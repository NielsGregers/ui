"use client"

import React, { use, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { set } from "date-fns"
import { ChevronDown, MoreHorizontal } from "lucide-react"
import { BiHandicap } from "react-icons/bi"
import { BsFillEvStationFill } from "react-icons/bs"
import { FaParking } from "react-icons/fa"
import { ThreeDots } from "react-loader-spinner"

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
  deleteBooking,
  getUsersBookingByDate,
  newParkingBooking,
} from "../actions/parking/parkingBookings"
import { getUserPlates } from "../actions/parking/user"
import { LicencePicker } from "./licenceplate-picker"

function ReserveParkingButton(params: {
  date: Date
  userEmail: string | undefined | null
}) {
  const [isopen, setisopen] = useState<boolean>(false)
  const [plates, setPlates] = useState<string>("")
  const [EV, setEV] = useState<boolean>(false)
  const [refresh, setrefresh] = useState(0)
  const [handicapped, sethandicapped] = useState<boolean>(false)
  const [booking, setbooking] = useState<UserParkingBooking | undefined>(
    undefined
  )
  const [result, setresult] = useState<BookingConfirmationType | undefined>(
    undefined
  )
  const [loading, setloading] = useState(true)

  const { date, userEmail } = params
  const { toast } = useToast()

  useEffect(() => {
    async function getBooking() {
      let result = await getUsersBookingByDate(
        params.userEmail ?? "",
        params.date
      )
      setbooking(result)
      setloading(false)
    }

    if (params.userEmail) {
      setloading(true)
      getBooking()
    }
  }, [params.date, params.userEmail, refresh])

  const platesChanged = (plates: string) => {
    setPlates(plates)
  }
  const router = useRouter()

  function refreshPage() {
    setTimeout(() => {
      setrefresh(refresh + 1)
    }, 500)

    return
  }

  async function handleCancel() {
    if (booking !== undefined) {
      const response = await deleteBooking(booking)
      if (response) {
        toast({
          title: "Success",
          description: "You cancelled your parking reservation",
        })
        refreshPage()
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } else return
  }

  async function handleBooking() {
    const response = await newParkingBooking(
      date?.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      userEmail ?? "",
      plates,
      EV,
      handicapped,
      0,
      0
    )

    if (response.success) {
      router.refresh()
      setisopen(false)
      refreshPage()
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
      setEV(false)
      sethandicapped(false)
      setresult(undefined)
    } else {
      setresult(response)
    }
  }

  return (
    <>
      {loading && (
        <Button
          variant="secondary"
          className="w-full rounded-full"
          disabled={true}
        >
          <ThreeDots
            height="50"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </Button>
      )}
      {!loading && booking === undefined && (
        <Dialog open={isopen} onOpenChange={() => setisopen(!isopen)}>
          <DialogTrigger asChild>
            <Button
              disabled={
                (date.getDate() ===
                  new Date(
                    new Date().setDate(new Date().getDate() + 1)
                  ).getDate() &&
                  new Date(new Date().setHours(12, 0, 0, 0)) < new Date()) ||
                date.getDate() <= new Date().getDate()
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
          <DialogContent className="bg-white dark:bg-black ">
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
            <div className="grid max-w-lg space-y-2">
              {result === undefined && (
                <div className="grid max-w-[300px] space-y-3">
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
                <div className="sm:max-w-[425px]">
                  <div className="sm:max-w-[425px]">{result.cause}</div>
                  <br />
                  <div className="sm:max-w-[425px]">
                    Would you like to reserve a parking space without the
                    charger?
                  </div>
                  <br />

                  <div className="flex flex-row justify-center space-x-2 sm:max-w-[425px]">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setisopen(false)
                        setresult(undefined)
                        setEV(false)
                        sethandicapped(false)
                      }}
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
                <div className="sm:max-w-[425px]">
                  <div>
                    <pre>No available handicapped parking.</pre>
                    <pre>
                      Would you like to reserve a regular parking space?
                    </pre>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setisopen(false)
                      setresult(undefined)
                      setEV(false)
                      sethandicapped(false)
                    }}
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
                  <div className="w-[200px]">
                    <pre>No available handicapped parking with EV charger.</pre>
                    <pre>
                      Would you like to reserve a regular parking space?
                    </pre>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setisopen(false)
                      setresult(undefined)
                      setEV(false)
                      sethandicapped(false)
                    }}
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
      {!loading && booking !== undefined && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="w-full rounded-full">
              <FaParking className="mr-2 h-4 w-4" style={{ color: "blue" }} />
              {"Reserved: " + booking.parkingTitle}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-row justify-between">
                {booking?.plates.toUpperCase()}
                {booking?.type == "permanent" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help items-center  justify-center rounded-full bg-gray-600 px-1 text-white">
                          P
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Permanently booked</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <div className="flex flex-row justify-between">
                <div className="font-normal">
                  floor:{" "}
                  <span style={{ fontWeight: "bold" }}>{booking?.floor}</span>
                </div>
                {booking?.EV && (
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
                {booking?.handicapped && (
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
              onClick={() => handleCancel()}
              disabled={
                (date.getDate() ===
                  new Date(
                    new Date().setDate(new Date().getDate() + 1)
                  ).getDate() &&
                  new Date(new Date().setHours(12, 0, 0, 0)) < new Date()) ||
                date.getDate() <= new Date().getDate()
              }
              className="cursor-pointer text-red-700"
            >
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

export default ReserveParkingButton
