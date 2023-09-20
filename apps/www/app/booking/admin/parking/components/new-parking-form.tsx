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
import { ScrollArea } from "@/registry/new-york/ui/scroll-area"
import { addParkingSpot } from "@/app/booking/actions/parking/parkingSpaces"
import { LicencePicker } from "@/app/booking/components/licenceplate-picker"
import { UsecaseContext } from "@/app/booking/usecasecontext"
import { MagicboxContext } from "@/app/magicbox-context"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  permanent: z.boolean().default(false),
  bookedBy: z.string().optional(),
  licence: z.string(),
  EV: z.boolean().default(false),
  handicapped: z.boolean().default(false),
})

export type schema = {
  title: string | undefined
  permanent?: boolean | undefined
  bookedBy?: string | undefined
  licence?: string
  EV: boolean
  handicapped: boolean
}

type FormProps = { onClose: () => void }

export default function NewParkingForm({ onClose }: FormProps) {
  const usecases = useContext(UsecaseContext)
  const magicbox = useContext(MagicboxContext)
  const [working, setworking] = useState(false)
  const [permanent, setpermanent] = useState<boolean>(false)
  const [licence, setlicence] = useState<string>("")
  const [user, setuser] = useState<string | undefined>(undefined)
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      bookedBy: "",
      licence: "",
      EV: false,
      handicapped: false,
    },
  })

  async function submit(data: z.infer<typeof formSchema>) {
    setworking(true)
    let result = await addParkingSpot(
      data.title,
      data.bookedBy as string,

      data.permanent ?? false,
      data.EV,
      data.handicapped,
      data.licence as string
    )
    setworking(false)
    //delay 1 sekcound to let the magicbox refresh
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.refresh()
    onClose()
  }

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
          <ScrollArea>
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
              name="EV"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">EV space</FormLabel>
                    <FormDescription>
                      Does this parking space have an EV charger?
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
              name="handicapped"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Handicapped space
                    </FormLabel>
                    <FormDescription>
                      Is this parking space accessible for disabled people?
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
            <div className="rounded-lg border p-4">
              <FormField
                control={form.control}
                name="permanent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Permanently reserved
                      </FormLabel>
                      <FormDescription>
                        Is this parking space dedicated for a special employee?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={() => {
                          form.setValue("permanent", !permanent)
                          setpermanent(!permanent)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {permanent && (
                <>
                  <FormField
                    control={form.control}
                    name="bookedBy"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Reserved for</FormLabel>
                        <SearchUserForm
                          onSelectUser={(user) => {
                            form.setValue("bookedBy", user?.userPrincipalName)
                            setuser(user?.userPrincipalName)
                          }}
                          defaultuserUserPrincipalName={field.value}
                        />

                        <FormDescription>
                          This user will permanently have access to this parking
                          spot.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="licence"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Reserved for</FormLabel>
                        <LicencePicker
                          userEmail={user}
                          onPlatesChange={(plates) => {
                            form.setValue("licence", plates)
                            setlicence(plates)
                          }}
                        />

                        <FormDescription>
                          This licence plates will permanently have access to
                          the garage.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          </ScrollArea>
          <Button
            disabled={
              form.getValues().title === "" || (permanent && licence == "")
            }
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
