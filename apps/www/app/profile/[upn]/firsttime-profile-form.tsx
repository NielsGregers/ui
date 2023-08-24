"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import { toast } from "@/registry/new-york/ui/use-toast"

import { useState } from "react"

import { CommandList } from "cmdk"

import { NewsChannels } from "./NewsChannels"
import { useSession } from "next-auth/react"
import { Country, Unit } from "@/app/profile/schemas/welcome"
import { NewsChannel } from "@/app/profile/schemas/NewsChannelSchema"
import { saveProfile } from "@/app/profile/actions/profiling"


const profileFormSchema = z.object({
  country: z
    .string({ required_error: "Please select a country." })
  ,
  unit: z.string({
    required_error: "Please select an unit to display.",
  })
  ,

  channels: z
    .array(
      z.string({

      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>




export function ProfileForm(props: { countries: Country[], units: Unit[], newsChannels: NewsChannel[],currentUnit:string,currentCountry:string }) {
  const session = useSession()

  const { countries, units, newsChannels } = props
  const [showCountries, setshowCountries] = useState(false)
  const [showUnits, setshowUnits] = useState(false)
  const [showChannels, setshowChannels] = useState(false)
  // This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
unit:props.currentUnit,
country:props.currentCountry
}
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",

  })



  async function onSubmit(data: ProfileFormValues) {
    const upn = session?.data?.user?.email ?? ""
    const redirectto = await saveProfile(upn, data.country,data.unit)

    toast({
      title: "You will be redirected to:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(redirectto, null, 2)}</code>
        </pre>
      ),
    })
    await new Promise(r => setTimeout(r, 1500));
    window.open(redirectto.href, redirectto.target)
   
  }

  const watchUnit = form.watch("unit", "")
  const watchCountry = form.watch("country", "")

  if (session === null) {
    return <div>no access</div>
  }


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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
                            {units.filter(unit => unit.unitType === "Business Unit").sort((a, b) => a.sortOrder - b.sortOrder).map((unit) => (
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
                            {units.filter(unit => unit.unitType === "Group Function").sort((a, b) => a.sortOrder - b.sortOrder).map((unit) => (
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
                            {countries.sort((a, b) => a.sortOrder - b.sortOrder).map((country) => (
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
            <FormField
              control={form.control}
              name="channels"
              render={({ field }) => (
                <FormItem className="flex flex-col pb-[30px]">
                  <FormLabel>News Channels</FormLabel>
                  <Popover open={showChannels} onOpenChange={setshowChannels} >
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
                          <NewsChannels country={watchCountry} unit={watchUnit} channels={newsChannels} />

                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0">
                      <Command>

                        <CommandInput placeholder="Search channels..." />

                        <CommandEmpty>No channels found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup >
                            {newsChannels.sort((a, b) => {
                              if (a.sortOrder.toLowerCase() < b.sortOrder.toLowerCase()) { return -1; }
                              if (a.sortOrder.toLowerCase() > b.sortOrder.toLowerCase()) { return 1; }
                              return 0;

                            }).map((channel) => (
                              <CommandItem
                                value={channel.channelName}
                                key={channel.channelCode}
                                onSelect={(value) => {

                                  setshowChannels(false)
                                }}
                              >

                                {channel.channelName}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the news channels that you subscribe to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <Button type="submit">Save profile</Button>
        </form>
      </Form>


    </div>
  )
}
