/* eslint-disable react/jsx-key */
"use client"

import React, { use, useEffect, useState } from "react"
import { addDays } from "date-fns"
import { Car } from "lucide-react"
import { DateRange } from "react-day-picker"
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

import BookParkingButton from "./bookparkingbutton"
import { UserParkingBooking, getBookingsByUser } from "../actions/parking/parkingBookings"


interface PropTypes {
  dateRange: DateRange
  userEmail:string|undefined|null
}

function DateCards(props: PropTypes) {
  const [dates, setdates] = useState<Date[]>([])
  const [userbookings, setuserbookings] = useState<UserParkingBooking[]>([])


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
        (props.dateRange.to?.getTime() - props.dateRange.from?.getTime()) /
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

useEffect(() => {
  async function load(){
    const bookings= await getBookingsByUser(props.userEmail??"", dates)
    setuserbookings(bookings)
  }
  if(dates.length>0){
    load()}
}, [dates, props.userEmail])


  return (
    <div className=" grid grid-cols-7 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {dates.map((date) => {
        return (
          <Card
            className={`h-72 ${
              date.getTime() === new Date().getTime()
                ? "col-span-2"
                : "col-span-1"
            }`}
          >
            <CardHeader className="h-1/4">
              <CardTitle>
                <div className=" flex w-full flex-row justify-between">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                  {date.getTime() == new Date().getTime() && <div> Today</div>}
                </div>
              </CardTitle>
              <CardDescription>
                {date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-2/4 items-center justify-center">
              <div className="grid h-full items-center">
                <Button className="w-full" variant="outline" disabled={true}>
                  <Car className="mr-2 h-4 w-4" />
                  Book a desk
                </Button>
                <BookParkingButton userEmail={props.userEmail} date={date} booking={userbookings.filter((data)=>
                {
                  if(data.date===date.toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric",})) return data
                })[0] } />
              </div>
            </CardContent>
            <CardFooter className="h-1/4"></CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

export default DateCards
