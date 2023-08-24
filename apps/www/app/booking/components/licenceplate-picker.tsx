"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { getLicencePlates } from "../actions/parking/getLicencePlates"
import { UsecaseContext } from "../usecasecontext"

let allplates: string[] = ["ZG12345TT", "ST54321AB"]

interface PropTypes {
  allPlates: string[]
  onPlatesChange: (plates: string) => void
}

export function LicencePicker(props: PropTypes) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [currentText, setCurrentText] = React.useState("")
  const usecases = React.useContext(UsecaseContext)
  // let allplates = await getLicencePlates("karlo.mrakovcic@nexigroup.com")

  React.useEffect(() => {
    props.onPlatesChange(value)
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value.toUpperCase() : "Select your licence plate..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            onValueChange={(text) => {
              setCurrentText(text)
            }}
            placeholder="Enter licence plate number..."
          />
          <CommandEmpty>
            No licence plates found.
            <Button
              onClick={() => {
                allplates = [...allplates, currentText.toUpperCase()]
                setValue(currentText.toUpperCase())
                usecases.AddLicencePlate(
                  currentText.toUpperCase(),
                  "karlo.mrakovcic@nexigroup.com"
                )
                setOpen(false)
              }}
            >
              Add a new one
            </Button>
          </CommandEmpty>
          <CommandGroup>
            {allplates.map((oneplate) => (
              <CommandItem
                key={oneplate}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === oneplate ? "opacity-100" : "opacity-0"
                  )}
                />
                {oneplate}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
