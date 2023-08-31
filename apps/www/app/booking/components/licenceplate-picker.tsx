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

import { getUserPlates } from "../actions/parking/user"
import { UsecaseContext } from "../usecasecontext"

interface PropTypes {
  userEmail: string | undefined | null
  onPlatesChange: (plates: string) => void
}

export function LicencePicker(props: PropTypes) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [currentText, setCurrentText] = React.useState("")
  const [allPlates, setallPlates] = React.useState<string[]>([])
  const usecases = React.useContext(UsecaseContext)

  React.useEffect(() => {
    props.onPlatesChange(value)
  }, [value])

  React.useEffect(() => {
    async function fetchMyPlates() {
      const result = await getUserPlates(props.userEmail ?? "")
      setallPlates(result)
    }

    if (props.userEmail != null && props.userEmail != undefined) fetchMyPlates()
  }, [props.userEmail])

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? value.toUpperCase()
              : "Select your licence plate number..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              onValueChange={(text) => {
                setCurrentText(text)
              }}
              placeholder="Enter licence plate number..."
            />
            <CommandEmpty>
              <div className="grid justify-center space-y-3">
                <div>No licence plates found.</div>
                <Button
                  size="sm"
                  className="w-[150px]"
                  onClick={() => {
                    setallPlates([...allPlates, currentText.toUpperCase()])
                    setValue(currentText.toUpperCase())
                    usecases.AddLicencePlate(
                      currentText.toUpperCase(),
                      props.userEmail ?? ""
                    )
                    setOpen(false)
                  }}
                >
                  Add a new one
                </Button>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {allPlates.map((oneplate) => (
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
    </div>
  )
}
