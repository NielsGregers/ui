"use client"

import React, { useState } from "react"
import { addDays } from "date-fns"

import DateCard from "./datecard"
import { MobileDatePicker, SingleDatePicker } from "./datepicker"

function Mobile() {
  const [date, setdate] = useState<Date>(new Date(addDays(new Date(), 1)))

  const onDateChange = (dateValue: Date) => {
    setdate(dateValue)
  }

  return (
    <div className=" container flex h-[80vh] flex-col items-center justify-center gap-2">
      {/* <SingleDatePicker onDateChange={onDateChange} /> */}
      <DateCard date={date} userEmail="karlo.mrakovcic@nexigroup.com" />
      <MobileDatePicker onDateChange={onDateChange} />
    </div>
  )
}

export default Mobile
