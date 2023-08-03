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

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

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
      monday = new Date()
    }

    setDate({ from: monday, to: sunday })
    if (monday.getTime() > sunday.getTime()) {
      console.log("entered 3rd if")
      setDate({ from: undefined, to: undefined })
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Button
        variant="outline"
        title="Today"
        color="white"
        name="Today"
        onClick={() =>
          setDate({
            from: new Date(),
            to: new Date(new Date().setDate(new Date().getDate() + 7)),
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
              "w-[300px] justify-start text-left font-normal",
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
      <Button variant="outline">{"<"}</Button>
      <Button variant="outline">{">"}</Button>
    </div>
  )
}
