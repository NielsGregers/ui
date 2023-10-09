"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { is, tr } from "date-fns/locale"
import { signIn, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Result } from "@/lib/httphelper"
import { Badge } from "@/registry/new-york/ui/badge"
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
import {
  CreateInvitationResult,
  createInvitation,
} from "@/app/profile/actions/onboarding"
import { set } from "date-fns"
import { NewGuest } from "./NewGuest"

const profileFormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ValidateEmailAccountForm() {
  const session = useSession()

  const defaultValues: Partial<ProfileFormValues> = {}

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const [invitationStatus, setInvitationStatus] =
    useState<Result<CreateInvitationResult>>()
  const [signinEnabled, setsigninEnabled] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [isNewGuest, setisNewGuest] = useState(false)
  const [isUnknownDomain, setisUnknownDomain] = useState(false)
  const [guideHTML, setguideHTML] = useState("")
  useEffect(() => {
    if (session?.data?.user?.email) {
      if (session?.data?.user?.email.indexOf("#ext#@") < 0) {
        form.setValue("email", session?.data?.user?.email)
      }
    }
  }, [session])

  async function onSubmit(data: ProfileFormValues) {
    setProcessing(true)
    setInvitationStatus(undefined)
    setsigninEnabled(false)
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
    setInvitationStatus(undefined)
    const x = await createInvitation(data)
    setInvitationStatus(x)

    setisNewGuest(x.data?.isNew ?? false)
    setguideHTML(x.data?.guideHTML ?? "")
    if (x.data?.valid) {
      setsigninEnabled(true)
      const parms: URLSearchParams = new URLSearchParams()
      parms.set("login_hint", form.getValues("email") as string)
      signIn(
        "azure-ad",
        {
          callbackUrl: "/profile/router",
        },
        parms
      )
    }
    setProcessing(false)
    console.log(x)
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Form {...form}>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input placeholder="Enter your email" {...field} autoFocus={true} />
                    <div className="w-4 grow"></div>
                    <Button type="submit" disabled={processing}>Login</Button>
                  </div>
                </FormControl>

                <FormDescription className="max-w-screen-sm">
                  Your email is validated against our user database. If we cannot
                  find yours, and if your are working for a company which have not
                  yet been onboarded we will create an invitation for your
                  account.
                </FormDescription>
                {invitationStatus && invitationStatus.hasError && <div className="rounded-lg bg-red-600 p-5 font-bold text-white">
                  {invitationStatus.errorMessage}

                </div>}
                <FormMessage />
              </FormItem>
            )}
          />


        </Form>
      </form>
      {isNewGuest && <NewGuest continueToSignin={function (): void {
        setsigninEnabled(true)
        const parms: URLSearchParams = new URLSearchParams()
        parms.set("login_hint", form.getValues("email") as string)
        signIn(
          "azure-ad",
          {
            callbackUrl: "/profile/router",
          },
          parms
        )
      } } cancel={function (): void {
        setisNewGuest(false)
      } } SigninGuideHTML={guideHTML} />}
    </div>
  )
}
