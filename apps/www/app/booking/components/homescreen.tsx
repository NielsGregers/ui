"use client"

import React, { useState } from "react"
import { addDays, setDate } from "date-fns"
import { DateRange } from "react-day-picker"

import DateCards from "./datecards"
import { DateRangePicker } from "./datepicker"

export interface DateRangeSelection {
  from: Date
  to: Date
}

function HomeScreen() {
  const [date, setdate] = useState<DateRange>({
    from: new Date() as Date,
    to: addDays(new Date(), 7) as Date,
  })

  const onDateChange = (dateRange: DateRange) => {
    setdate(dateRange)
  }

  return (
    <div className="container flex flex-col gap-2 mt-7">
      <DateRangePicker onDateChange={onDateChange} />
      <DateCards dateRange={date} />
    </div>
  )
}

export default HomeScreen
