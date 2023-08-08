"use client"

import Link from "next/link"
import { redirect } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronsUpDown } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { connect, insert } from "@/lib/mongodb"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/default/ui/button"
import { Checkbox } from "@/registry/default/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/registry/default/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form"
import { Input } from "@/registry/default/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover"
import { Switch } from "@/registry/default/ui/switch"
import { toast } from "@/registry/default/ui/use-toast"

import { User } from "./page"
import { useContext, useState } from "react"
import { UsecaseContext } from "@/app/booking/usecasecontext"
import { SearchUserForm } from "@/components/searchuser"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  permanent: z.boolean().default(false).optional(),
  bookedBy: z.string().optional(),
})

export type schema = {
  title: string | undefined
  permanent?: boolean | undefined
  bookedBy?: string | undefined
}

type FormProps = { onSubmit: (values: schema) => void;  }

export default function NewParkingForm({ onSubmit }: FormProps) {

  const usecases = useContext(UsecaseContext);
  const [working, setworking] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      bookedBy: "",
    },
  })

  async function submit(data: z.infer<typeof formSchema>) {
    setworking(true)
    await usecases.CreateParkingSlot(data.title, data.bookedBy as string, data.permanent ?? false)
    setworking(false)
  }



  return (
    <div className="container">
   
      <Form {...form} >
        <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of a parking spot marked in the garage.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permanent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Permanently reserved
                  </FormLabel>
                  <FormDescription>
                    Is this parking space dedicated for a special employee.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bookedBy"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Booked by</FormLabel>
                <SearchUserForm onSelectUser={(user) => {
                  form.setValue("bookedBy", user?.userPrincipalName)
                 
                  }} defaultuserUserPrincipalName={field.value} />

                <FormDescription>
                  This user will permanently have this parking spot.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
