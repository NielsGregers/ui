/* eslint-disable tailwindcss/classnames-order */
"use client"

import React, { useContext, useEffect, useState } from "react"
import { addDays, set, setDate } from "date-fns"
import { DateRange } from "react-day-picker"
import { ThreeCircles } from "react-loader-spinner"

import CurrentTime from "./currentTime"
import DateCards from "./datecards"
import { DateRangePicker } from "./datepicker"
import Mobile from "./mobile"
import { aquireToken } from "../msal"
import { BookingContext } from "../context"
import { https } from "@/lib/httphelper"
import {Root as Me} from "../schema/me"

export interface DateRangeSelection {
  from: Date
  to: Date
}

interface PropTypes {
  userEmail: string | undefined | null
}

function HomeScreen(props: PropTypes) {
  const [date, setdate] = useState<DateRange>({
    from: new Date() as Date,
    to: addDays(new Date(), 3) as Date,
  })
  const [loading, setloading] = useState(true)

  const [me, setme] = useState<Me>()
const context = useContext(BookingContext)


const getMe = async () => {
  const tokenRequest = await context.getToken(["User.Read"])
  if (tokenRequest.hasError ){
    alert("error  " +  tokenRequest.errorMessage)
    return 

  }

  const meResponse = await https<Me>(tokenRequest.data??"","GET", "https://graph.microsoft.com/v1.0/me")
  if (meResponse.errorMessage){
    alert("error  " +  meResponse.errorMessage)
    return 

  }
  setme(meResponse.data)

}

  useEffect(() => {
    setTimeout(() => {
      setloading(false)
    }, 500)
    getMe()
  }, [])

  const onDateChange = (dateRange: DateRange) => {
    setdate(dateRange)
  }



  return (
    <div>
      <div className="hidden md:flex">
        <CurrentTime />
        {me?.displayName}
        {!loading && (
          <div className="min-h-[90vh] container flex flex-col gap-2 justify-center">
            <DateRangePicker numberOfDays={3} onDateChange={onDateChange} />
            <DateCards dateRange={date} userEmail={props.userEmail} />
          </div>
        )}
        {loading && (
          <div className="min-h-[90vh] min-w-[97vw] flex flex-col items-center justify-center">
            <ThreeCircles
              height="100"
              width="100"
              color="#2D32AA"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        )}
      </div>
      <div className="flex md:hidden">
        <Mobile email={props.userEmail} />
      </div>
    </div>
  )
}

export default HomeScreen
