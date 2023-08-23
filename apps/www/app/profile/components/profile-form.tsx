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
import { useEffect, useState } from "react"
import { Result } from "@/lib/httphelper"
import { Badge } from "@/registry/new-york/ui/badge"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { tr } from "date-fns/locale"
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

const defaultValues: Partial<ProfileFormValues> = {
 
  }
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })
 
  const [invitationStatus, setInvitationStatus] = useState<Result<CreateInvitationResult>>()
  const [signinEnabled, setsigninEnabled] = useState(false)
useEffect(() => {
  if (session?.data?.user?.email) {
    if (session?.data?.user?.email.indexOf("#ext#@")<0) {
    form.setValue("email",session?.data?.user?.email)
  }}

  
}, [session])




  async function onSubmit(data: ProfileFormValues) {
    setInvitationStatus(undefined)
    setsigninEnabled(false)
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
   if (x.data?.valid) {
   setsigninEnabled(true)
  }

   
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
                <div className="flex">
                <Input placeholder="Enter your email" {...field} />
                <div className="w-4 flex-grow"></div>
                <Button type="submit"  >Validate</Button>
                </div>
              </FormControl>

              <FormDescription className="max-w-screen-sm">
                Your email is validated against our user database. If we cannot find yours, and
                if your are working for a company which have not yet been onboarded we will create an invitation
                for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<div className="flex">
      
        <div className="flex-grow"></div>
        <Button variant="default" className="ml-2" type="button" disabled={!signinEnabled}
        onClick={()=>{
          const parms : URLSearchParams =new URLSearchParams()
          parms.set("login_hint",form.getValues("email") as string)
          signIn("azure-ad",{

callbackUrl: "/profile/router",

          },parms)}}>Sign In</Button>
           <div className="flex-grow"></div>

        
        <div>
        </div>
        {/* {invitationStatus?.data?.invitation?.invitedUserType &&
<div>
<Badge>{invitationStatus?.data?.invitation?.invitedUserType}</Badge>
<Link href={invitationStatus?.data?.invitation?.inviteRedeemUrl} target="_blank">Link</Link>
</div>
        }
        </div>
        <div>
        {invitationStatus?.data?.user && invitationStatus?.data?.user.userType==="Guest" &&
<div>
<Badge>Guest {invitationStatus?.data?.user.externalUserState}</Badge>

</div>
        } */}
        </div>
        <div>
        {invitationStatus?.data?.user && invitationStatus?.data?.user.userType===null &&
<div>
<Badge>Licensed user</Badge>

</div>
        }
        </div>
       {/* <pre>
          {JSON.stringify(invitationStatus,null,2)}
       </pre> */}

      </Form>
    </form>
  )
}
