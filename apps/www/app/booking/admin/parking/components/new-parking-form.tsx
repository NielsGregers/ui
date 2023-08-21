"use client"

import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { roundToNearestMinutes } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { SearchUserForm } from "@/components/searchuser"
import { Button } from "@/registry/default/ui/button"
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
import { Switch } from "@/registry/default/ui/switch"
import { UsecaseContext } from "@/app/booking/usecasecontext"

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

type FormProps = { onSubmit: (values: schema) => void }

export default function NewParkingForm({ onSubmit }: FormProps) {
  const usecases = useContext(UsecaseContext)
  const [working, setworking] = useState(false)
  const router = useRouter()
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
    await usecases.CreateParkingSlot(
      data.title,
      data.bookedBy as string,
      data.permanent ?? false
    )
    setworking(false)
    router.refresh()
  }

  return (
    <div className="container">
      <Form {...form}>
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
                <FormLabel>Reserved for</FormLabel>
                <SearchUserForm
                  onSelectUser={(user) => {
                    form.setValue("bookedBy", user?.userPrincipalName)
                  }}
                  defaultuserUserPrincipalName={field.value}
                />

                <FormDescription>
                  This user will permanently have access to this parking spot.
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
