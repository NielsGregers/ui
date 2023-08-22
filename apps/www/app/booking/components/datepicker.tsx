/* eslint-disable tailwindcss/classnames-order */
"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { hr } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/default/ui/button"
import { Calendar } from "@/registry/default/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover"

import { DateRangeSelection } from "./homescreen"

interface PropTypes {
  onDateChange: (dateRange: DateRange) => void
}

export function DateRangePicker({ onDateChange }: PropTypes) {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 6),
  })

  React.useEffect(() => {
    onDateChange(date)
  }, [date])

  const onSelect = (pickeddate: DateRange | undefined) => {
    let from: Date = pickeddate?.from ? pickeddate.from : new Date()

    if (from === date?.from) {
      console.log("entered 1st if")
      from = pickeddate?.to ? pickeddate.to : new Date()
    }
    let monday = new Date(
      from.setDate(from.getDate() - ((from.getDay() + 6) % 7))
    )

    let sunday = new Date(
      monday.getFullYear(),
      monday.getMonth(),
      monday.getDate() + 6
    )

    if (sunday > new Date(new Date().setDate(new Date().getDate() + 7))) {
      console.log("entered 2nd if")
      sunday = new Date(new Date().setDate(new Date().getDate() + 7))
      monday = new Date(new Date().setDate(new Date().getDate() + 1))
    }

    setDate({ from: monday, to: sunday })
    if (monday.getTime() > sunday.getTime()) {
      console.log("entered 3rd if")
      setDate({ from: undefined, to: undefined })
    }
  }

  const moveWeek = (days: number) => {
    let start = date.from ? date.from : new Date()
    let end = date.to ? date.to : new Date()
    if (
      new Date(end.setDate(end.getDate() + days)) >
      new Date(new Date().setDate(new Date().getDate() + 7))
    ) {
      end = new Date(new Date().setDate(new Date().getDate() + 7))
      start = new Date(new Date().setDate(new Date().getDate() + 1))
    }
    setDate({
      from: new Date(start.setDate(start.getDate() + days)),
      to: new Date(end.setDate(end.getDate() + days)),
    })
  }

  return (
    // <div className={cn("grid gap-2", className)}>
    <div className="flex-row">
      <Button
        variant="outline"
        title="Today"
        color="white"
        name="Today"
        onClick={() =>
          setDate({
            from: new Date(),
            to: addDays(new Date(), 6) as Date,
          })
        }
      >
        {" "}
        Today{" "}
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal pt-[1px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            disabled={(date) =>
              date > new Date(new Date().setDate(new Date().getDate() + 7)) ||
              date < new Date("2023-07-01")
            }
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={2}
            ISOWeek
            // locale={hr}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={() => moveWeek(-7)} variant="outline">
        {"<"}
      </Button>
      <Button
        disabled={
          (date.to ? date.to : new Date()) >=
          new Date(new Date().setDate(new Date().getDate() + 7))
        }
        onClick={() => moveWeek(7)}
        variant="outline"
      >
        {">"}
      </Button>
    </div>
    // </div>
  )
}
