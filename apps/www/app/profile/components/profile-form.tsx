"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as z from "zod"


import { Button } from "@/registry/new-york/ui/button"
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

import { toast } from "@/registry/new-york/ui/use-toast"

import { CreateInvitationResult, createInvitation } from "./serveractions"
import { useState } from "react"
import { Result } from "@/lib/httphelper"
const profileFormSchema = z.object({

  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),

})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {

}




export function ValidateEmailAccountForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })
  const [invitationStatus, setInvitationStatus] = useState<Result<CreateInvitationResult>>()




  async function onSubmit(data: ProfileFormValues) {
    setInvitationStatus(undefined)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
   const x =   await createInvitation(data)
   setInvitationStatus(x)

   
   console.log(x) 
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Form {...form}>
        {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       */}


        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>

              <FormDescription className="max-w-screen-sm">
                Your email is validated against our user database. If we cannot find yours, and
                if your are working for a company which have not yet been onboarded we will create and invitation
                for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit">Continue</Button>
       <pre>
          {JSON.stringify(invitationStatus,null,2)}
       </pre>

      </Form>
    </form>
  )
}
