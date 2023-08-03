

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/registry/new-york/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group"
import { toast } from "@/registry/new-york/ui/use-toast"
import { useContext, useEffect } from "react";
import { UsecaseContext } from "../usecasecontext"

import * as React from "react"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
  country: z.string().nonempty("Please select a country"),
  unit: z.string().nonempty("Please select a unit"),
})

export default function RadioGroupForm(params :{ countries: any[],units: any[],currentCountry:string,currentUnit:string}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const usecases = useContext(UsecaseContext);
  useEffect(() => {
    form.setValue("country", params.currentCountry)
    form.setValue("unit", params.currentUnit)
  
   
  }, [params.currentCountry,params.currentUnit])
  

  function onSubmit(data: z.infer<typeof FormSchema>) {
   
    usecases.Select(data.country,data.unit)
    toast({
      title: "Your settings has been saved",
      color: "success"
     ,
    })
  }

  return (
    <>
 <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}>
     <Card className="w-[350px]">
     <CardHeader>
       <CardTitle>Welcome to Nexi Group</CardTitle>
       <CardDescription>Need a few informations from you. The data is saved in a cookie, so by clicking save you consent to that we, Nexi Group, may store your preferences.</CardDescription>
     </CardHeader>
     <CardContent>
    
        <div className="center ">
        
        <div className="flex space-x-6 pt-2">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Country</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={params.currentCountry}
                  className="flex flex-col space-y-1"
                >
                 {params.countries?.map((country, id) => {
                  return (
                  <FormItem key={id} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={country.code} />
                    </FormControl>
                    <FormLabel className="font-normal">
                    {country.Name}
                    </FormLabel>
                  </FormItem>
                  )
              } )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business/Group Unit</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={params.currentUnit}
                  className="flex flex-col space-y-1"
                >
                 {params.units?.map((unit, id) => {
                  return (
                  <FormItem key={id} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={unit.short} />
                    </FormControl>
                    <FormLabel className="font-normal">
                    {unit.name}
                    </FormLabel>
                  </FormItem>
                  )
              } )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="mt-6">
        
        </div>
        </div>
  
     </CardContent>
     <CardFooter className="flex justify-between">
      <div></div>
{/*  
       <Button variant="outline" onClick={()=>{  form.setValue("country", "")
    form.setValue("unit", "")
  }}>Clear</Button>  */}
       <Button type="submit" >Continue</Button>
     </CardFooter>
     
   </Card>
   </form>
    </Form>
   </>
  )
}



