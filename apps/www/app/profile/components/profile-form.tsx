"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"
import { Textarea } from "@/registry/new-york/ui/textarea"
import { toast } from "@/registry/new-york/ui/use-toast"
import { useContext } from "react"
import { ProfileContext } from "../usecasecontext"
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

const useCases = useContext(ProfileContext)
  function onSubmit(data: ProfileFormValues) {
   
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      
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
      </form>
    </Form>
  )
}
