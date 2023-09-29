/* eslint-disable tailwindcss/classnames-order */
"use client"

import React, { useState } from "react"
import { addDays, setDate } from "date-fns"
import { DateRange } from "react-day-picker"

import CurrentTime from "./currentTime"
import DateCards from "./datecards"
import { DateRangePicker } from "./datepicker"

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
    to: addDays(new Date(), 7) as Date,
  })

  const onDateChange = (dateRange: DateRange) => {
    setdate(dateRange)
  }

  return (
    <div>
      <CurrentTime />
      <div className="min-h-[90vh] container flex flex-col gap-2 justify-center">
        <DateRangePicker numberOfDays={3} onDateChange={onDateChange} />
        <DateCards dateRange={date} userEmail={props.userEmail} />
      </div>
    </div>
  )
}

export default HomeScreen
