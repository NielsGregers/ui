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
  numberOfDays: number
  onDateChange: (dateRange: DateRange) => void
}

export function DateRangePicker({ onDateChange, numberOfDays }: PropTypes) {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), numberOfDays - 1),
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
    if (numberOfDays === 7) {
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
    } else {
      //number of days after the selected date
      let endDate = new Date(addDays(from, numberOfDays - 1))
      let fromDate = from
      if (
        new Date().getTime() <
          new Date(new Date().setHours(12, 0, 0)).getTime() &&
        endDate > new Date(addDays(new Date(), numberOfDays - 1))
      ) {
        endDate = new Date(addDays(new Date(), numberOfDays - 1))
        fromDate = new Date()
      } else if (
        new Date().getTime() >
          new Date(new Date().setHours(12, 0, 0)).getTime() &&
        endDate > new Date(addDays(new Date(), numberOfDays))
      ) {
        endDate = new Date(addDays(new Date(), numberOfDays))
        fromDate = new Date()
      }
      setDate({ from: fromDate, to: endDate })
    }
  }

  const moveForward = (days: number) => {
    let start = date.from ? date.from : new Date()
    let end = date.to ? date.to : new Date()

    let endDate = new Date(addDays(end, days))
    let fromDate = new Date(addDays(start, days))

    if (
      new Date().getTime() <
        new Date(new Date().setHours(12, 0, 0)).getTime() &&
      endDate > new Date(addDays(new Date(), numberOfDays - 1))
    ) {
      endDate = new Date(addDays(new Date(), numberOfDays - 1))
      fromDate = new Date()
    } else if (
      new Date().getTime() <
        new Date(new Date().setHours(12, 0, 0)).getTime() &&
      endDate > new Date(addDays(new Date(), numberOfDays))
    ) {
      endDate = new Date(addDays(new Date(), numberOfDays))
      fromDate = new Date()
    }
    setDate({ from: fromDate, to: endDate })
  }
  const moveBackward = (days: number) => {
    let start = date.from ? date.from : new Date()
    let end = date.to ? date.to : new Date()

    let endDate = new Date(addDays(end, -1 * days))
    let fromDate = new Date(addDays(start, -1 * days))

    setDate({ from: fromDate, to: endDate })
  }

  return (
    // <div className={cn("grid gap-2", className)}>
    <div className="flex-row pb-3">
      <Button
        className="bg-white dark:bg-black shadow-md"
        variant="outline"
        title="Today"
        color="white"
        name="Today"
        onClick={() =>
          setDate({
            from: new Date(),
            to: addDays(new Date(), numberOfDays - 1) as Date,
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
              "bg-white dark:bg-black shadow-md w-[300px] justify-start text-left font-normal pt-[1px]",
              !date && "text-muted-foreground "
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
              (new Date().getTime() >
              new Date(new Date().setHours(12, 0, 0)).getTime()
                ? date >
                  new Date(
                    new Date().setDate(new Date().getDate() + numberOfDays)
                  )
                : date >
                  new Date(
                    new Date().setDate(new Date().getDate() + numberOfDays - 1)
                  )) || date < new Date("2023-07-01")
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
      <Button
        onClick={() => moveBackward(numberOfDays)}
        variant="outline"
        className="bg-white dark:bg-black shadow-md"
      >
        {"<"}
      </Button>
      <Button
        disabled={
          new Date().getTime() <
          new Date(new Date().setHours(12, 0, 0)).getTime()
            ? new Date(addDays(new Date(), numberOfDays - 1)).setHours(12) <
              new Date(addDays(date?.to ?? new Date(), 1)).setHours(12)
            : new Date(addDays(new Date(), numberOfDays)).setHours(12) ===
              new Date(addDays(date?.to ?? new Date(), 1)).setHours(12)
        }
        onClick={() => moveForward(numberOfDays)}
        className="bg-white dark:bg-black shadow-md"
        variant="outline"
      >
        {">"}
      </Button>
    </div>
    // </div>
  )
}

interface SinglePropTypes {
  onDateChange: (dateValue: Date) => void
}

export function SingleDatePicker({ onDateChange }: SinglePropTypes) {
  const [date, setDate] = React.useState<Date>(new Date(addDays(new Date(), 1)))

  React.useEffect(() => {
    onDateChange(date)
  }, [date])

  return (
    <div className="flex flex-row gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => setDate(date as Date)}
            initialFocus
            disabled={(date) =>
              date >
                (new Date().getTime() > 12
                  ? new Date(new Date().setDate(new Date().getDate() + 3))
                  : new Date(
                      new Date().setDate(new Date().getDate() + 3 - 1)
                    )) || date < new Date("2023-07-01")
            }
          />
        </PopoverContent>
      </Popover>
      <div className="flex flex-row gap-1">
        <Button
          onClick={() => {
            setDate(addDays(date, -1))
          }}
          variant="outline"
          className="bg-white dark:bg-black shadow-md"
        >
          {"<"}
        </Button>
        <Button
          disabled={
            new Date().getTime() < 12
              ? new Date(addDays(new Date(), 2)).getDate() <
                new Date(addDays(date, 1)).getDate()
              : new Date(addDays(new Date(), 3)).getDate() <
                new Date(addDays(date, 1)).getDate()
          }
          onClick={() => {
            setDate(addDays(date, 1))
          }}
          className="bg-white dark:bg-black shadow-md"
          variant="outline"
        >
          {">"}
        </Button>
      </div>
    </div>
  )
}

export function MobileDatePicker({ onDateChange }: SinglePropTypes) {
  const [date, setDate] = React.useState<Date>(new Date(addDays(new Date(), 1)))

  React.useEffect(() => {
    onDateChange(date)
  }, [date])

  return (
    <div>
      <div className=" flex flex-row justify-between items-end fixed bottom-0 left-0 z-40 w-full h-[6vh] bg-white dark:bg-zinc-900 border-t shadow-2xl"></div>
      <div className=" flex flex-row justify-between items-end fixed bottom-0 left-0 z-50 w-full h-[10vh]">
        <Button
          onClick={() => {
            setDate(addDays(date, -1))
          }}
          variant="outline"
          className="w-[40vw] bg-transparent shadow-none h-[6vh] border-none hover:bg-transparent hover:shadow-none hover:border-none text-xl font-bold"
        >
          {"<"}
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button className=" w-[10vh] h-[10vh] rounded-full bg-[#2d32aa] hover:bg-[#212861] dark:bg-[#212861] dark:hover:bg-[#2d32aa] mb-[-5px]">
              <CalendarIcon className=" h-16 w-16 text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setDate(date as Date)}
              initialFocus
              disabled={(date) =>
                (new Date().getTime() >
                new Date(new Date().setHours(12, 0, 0)).getTime()
                  ? date >
                    new Date(new Date().setDate(new Date().getDate() + 3))
                  : date >
                    new Date(
                      new Date().setDate(new Date().getDate() + 3 - 1)
                    )) || date < new Date("2023-07-01")
              }
            />
          </PopoverContent>
        </Popover>
        <Button
          disabled={
            new Date().getTime() <
            new Date(new Date().setHours(12, 0, 0)).getTime()
              ? new Date(addDays(new Date(), 3 - 1)).setHours(12) <
                new Date(addDays(date, 1)).setHours(12)
              : new Date(addDays(new Date(), 3)).setHours(12) <
                new Date(addDays(date, 1)).setHours(12)
          }
          onClick={() => {
            setDate(addDays(date, 1))
          }}
          className="w-[40vw] bg-transparent shadow-none h-[6vh] border-none hover:bg-transparent hover:shadow-none hover:border-none text-xl font-bold"
          variant="outline"
        >
          {">"}
        </Button>
      </div>
    </div>
  )
}
