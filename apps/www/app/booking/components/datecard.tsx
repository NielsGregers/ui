import React from "react"
import { GiDesk } from "react-icons/gi"

import { Button } from "@/registry/default/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"

import { getParkingAvailability } from "../actions/parking/parkingBookings"
import PieGraph from "./piegraph"
import ReserveParkingButton from "./reserveParkingButton"

type PropTypes = {
  date: Date
  userEmail: string | undefined | null
}

function DateCard(props: PropTypes) {
  return (
    <Card
      className={` min-h-[65vh] min-w-[85vw] border-none shadow-md md:min-h-[35vh] md:min-w-[10vw] ${
        props.date.getTime() === new Date().getTime()
          ? "col-span-2"
          : "col-span-1"
      }`}
    >
      <CardHeader className="h-1/4">
        <CardTitle>
          <div className=" flex w-full flex-row justify-between">
            {props.date.toLocaleDateString("en-US", { weekday: "short" })}
            {props.date.getTime() == new Date().getTime() && <div> Today</div>}
          </div>
        </CardTitle>
        <CardDescription>
          {props.date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-5 h-2/4 items-center justify-center">
        <div className="grid h-full items-center">
          <Button
            className="w-full rounded-full"
            variant="outline"
            disabled={true}
          >
            <GiDesk className="mr-2 h-4 w-4" />
            {/* <Car className="mr-2 h-4 w-4" /> */}
            Book a desk
          </Button>
          <ReserveParkingButton userEmail={props.userEmail} date={props.date} />
        </div>
      </CardContent>
      <CardFooter className="h-1/4">{/* <PieGraph /> */}</CardFooter>
    </Card>
  )
}

export default DateCard
