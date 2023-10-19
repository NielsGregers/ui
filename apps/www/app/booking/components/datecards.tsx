/* eslint-disable react/jsx-key */
"use client"

import React, { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addDays } from "date-fns"
import { Car } from "lucide-react"
import { DateRange } from "react-day-picker"
import { BsFillMapFill } from "react-icons/bs"
import { FaQuestion } from "react-icons/fa"
import { GiDesk } from "react-icons/gi"
import { HiMail } from "react-icons/hi"
import { Cell, Pie, PieChart } from "recharts"

import { Button } from "@/registry/default/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog"
import { Label } from "@/registry/default/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip"

import { UserParkingBooking } from "../actions/parking/parkingBookings"
import DateCard from "./datecard"
import PieGraph from "./piegraph"
import Rules from "./rules"

const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms))

interface PropTypes {
  dateRange: DateRange
  userEmail: string | undefined | null
}

function DateCards(props: PropTypes) {
  const [dates, setdates] = useState<Date[]>([])
  const [userbookings, setuserbookings] = useState<UserParkingBooking[]>([])
  const [refresh, setrefresh] = useState<number>(0)

  const router = useRouter()

  useEffect(() => {
    let datesSelected: Date[] = []
    let i = 1
    let num = 0
    if (
      props.dateRange.from === undefined ||
      props.dateRange.to === undefined
    ) {
      console.log("it's undefined")
      num = 0
    } else {
      datesSelected = [...datesSelected, props.dateRange.from]
      num =
        (new Date(props.dateRange.to?.setHours(12)).getTime() -
          new Date(props.dateRange.from?.setHours(12)).getTime()) /
        (1000 * 3600 * 24)
      console.log(num)
    }

    while (i <= num) {
      let date = addDays(datesSelected[0], i) as Date
      datesSelected = [...datesSelected, date]
      i++
    }
    console.log(datesSelected)
    setdates(datesSelected)
  }, [props.dateRange])

  return (
    <div className="grid max-h-[75vh] min-h-[50vh] grid-cols-4 gap-8 2xl:mt-10">
      {dates.map((date) => {
        return <DateCard date={date} userEmail={props.userEmail} />
      })}

      <Card
        className={`max-h-[50vh] min-h-[35vh] border-none bg-black bg-opacity-5 `}
      >
        <CardHeader className="h-1/4">
          <CardTitle>
            <div className=" flex w-full flex-row justify-between text-lg text-white">
              Useful links
            </div>
          </CardTitle>
          {/* <CardDescription>
                {date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </CardDescription> */}
        </CardHeader>
        <CardContent className="h-2/4 items-center justify-center">
          <div className="grid h-full items-center">
            <Rules />
            {/* <a href="garage_plan.pdf" target="_blank"> */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="w-full cursor-not-allowed opacity-20"
                    variant="outline"
                  >
                    <BsFillMapFill className="mr-2 h-4 w-4" />
                    Garage floor plan
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming soon!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* </a> */}
            <a href="mailto:nexibooking-cro@nexigroup.com" target="_blank">
              <Button className="w-full" variant="outline">
                <HiMail className="mr-2 h-4 w-4" />
                Have a question?
              </Button>
            </a>
          </div>
        </CardContent>
        <CardFooter className="h-1/4"></CardFooter>
      </Card>
    </div>
  )
}

export default DateCards
