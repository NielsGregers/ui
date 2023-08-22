"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import { Calendar } from "@/registry/new-york/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/registry/new-york/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { Input } from "@/registry/new-york/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import { toast } from "@/registry/new-york/ui/use-toast"

import { useContext, useState } from "react"
import { ProfileContext } from "../usecasecontext"
import { CommandList } from "cmdk"

import { NewsChannels } from "./NewsChannels"

const profileFormSchema = z.object({
  country: z
    .string({ required_error: "Please select a country." })
  ,
  unit: z
    .string({
      required_error: "Please select an unit to display.",
    })
    ,

  channels: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {

}


export function ProfileForm() {
  const profileContext = useContext(ProfileContext)
  const {countries,units} = profileContext
  const [showCountries, setshowCountries] = useState(false)
  const [showUnits, setshowUnits] = useState(false)
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",

  })

  const { fields, append } = useFieldArray({
    name: "channels",
    control: form.control,
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
 //   profileContext.Select(data.country,data.unit)
  }

  const watchUnit = form.watch("unit", "") 
  const watchCountry = form.watch("country", "") 
  return (
    <div>
    <Form {...form}>
      <form   onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <div>
          <FormField
        
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="flex flex-col pb-[30px]">
                <FormLabel>Business Unit / Group Function</FormLabel>
                <Popover open={showUnits} onOpenChange={setshowUnits} >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[400px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? units.find(
                            (unit) => unit.unitName.toLowerCase() === field.value
                          )?.unitName
                          : "Select unit"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px]  p-0">
                    <Command >
                      <CommandInput placeholder="Search units..." />
                      <CommandList>
                      <CommandEmpty>No unit found.</CommandEmpty>
                      <CommandGroup heading="Business Units">
                        {units.filter(unit=>unit.unitType === "Business Unit").sort((a,b)=>a.sortOrder-b.sortOrder).map((unit) => (
                          <CommandItem
                            value={unit.unitName}
                            key={unit.unitName}
                            onSelect={(value) => {
                              form.setValue("unit", value)
                              setshowUnits(false)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                unit.unitName === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {unit.unitName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Group Functions">
                        {units.filter(unit=>unit.unitType === "Group Function").sort((a,b)=>a.sortOrder-b.sortOrder).map((unit) => (
                          <CommandItem
                            value={unit.unitName}
                            key={unit.unitName}
                            onSelect={(value) => {
                              form.setValue("unit", value)
                              setshowUnits(false)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                unit.unitName === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {unit.unitName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the unit which will be used for tailoring your experience.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
                 <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col pb-[30px]">
                <FormLabel>Country / Region</FormLabel>
                <Popover open={showCountries} onOpenChange={setshowCountries} >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[400px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? countries.find(
                            (country) => country.countryName.toLowerCase() === field.value
                          )?.countryName
                          : "Select country"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className=" p-0">
                    <Command>
                   
                      <CommandInput placeholder="Search countries..." />
                      <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.sort((a,b)=>a.sortOrder-b.sortOrder).map((country) => (
                          <CommandItem
                            value={country.countryName}
                            key={country.countryName}
                            onSelect={(value) => {
                              form.setValue("country", value)
                              setshowCountries(false)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                country.countryName === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {country.countryName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the country which will be used for tailoring your experience.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Change News channels
          </Button>
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>

    <NewsChannels country={watchCountry} unit={watchUnit} channels={profileContext.newsChannels} />
    </div>
  )
}
