"use client"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useSession } from "next-auth/react"
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


const searchFormSchema = z.object({
  name: z
    .string()
     .min(2, {
       message: "Name must be at least 2 characters.",
     })

  
})

type SearchFormValues = z.infer<typeof searchFormSchema>

// This can come from your database or API.
const defaultValues: Partial<SearchFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}
type Props = {
  onSelectUser : (name:string) => void
};


export  function SearchUserForm({ onSelectUser }: Props)  {
    const { data: session, status } = useSession()
    const [searchFor, setsearchFor] = useState("")
    const [results, setresults] = useState([])
    const s: any = session

    useEffect(() => {
        const load = async () => {
          const res = await fetch(`https://graph.microsoft.com/v1.0/me/people/?$search=${searchFor}`, {
            headers: { Authorization: `Bearer ${s.accessToken}` }
          })
    
          const data = await res.json()
          console.log(data)
          setresults(data.value)
        }
        if (s?.accessToken && searchFor.length > 2) {
          load()
        }else{
            setresults([])
        }
    
      }, [s?.accessToken, searchFor])

  const form = useForm<SearchFormValues>({
  //  resolver: zodResolver(searchFormSchema),
    defaultValues,
  })

  function onSubmit(data: SearchFormValues) {
    setsearchFor(data.name)
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search for</FormLabel>
              <FormControl>
                <Input placeholder="Search" {...field} />
              </FormControl>
              <FormDescription>
               This is what you will be searching for
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       
        
        <Button type="submit">Search</Button>
      </form>
    </Form>

    <div>
        Found: [{results.length}]
        {results.map((r:any,index:number)=>(
            <div key={index} onClick={()=>{onSelectUser(r.displayName)}}>{r.displayName}</div>
        ))} </div></>
  )
}