/* eslint-disable tailwindcss/classnames-order */
"use client"

import React, { useEffect, useState } from "react"
import { addDays, set, setDate } from "date-fns"
import { DateRange } from "react-day-picker"
import { ThreeCircles } from "react-loader-spinner"

import CurrentTime from "./currentTime"
import DateCards from "./datecards"
import { DateRangePicker } from "./datepicker"
import Mobile from "./mobile"

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

  useEffect(() => {
    setTimeout(() => {
      setloading(false)
    }, 500)
  }, [])

  const onDateChange = (dateRange: DateRange) => {
    setdate(dateRange)
  }

  return (
    <div>
      <div className="hidden md:flex">
        <CurrentTime />
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
