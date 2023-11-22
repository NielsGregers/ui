"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { IProgressProps, ProcessStatusOverlay } from "@/components/progress"
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


import { SeaViewProps } from "../../navcomponents/seaviewprops"

export function SeaViewForm(props: {item?:any, schema: z.Schema}) : SeaViewProps{

  const { item ,schema} = props
  type ItemType = z.infer<typeof schema>
  const [processing, setProcessing] = useState(false)
  const [processPercentage, setProcessPercentage] = useState(0)
  const [processTitle, setProcessTitle] = useState("")
  const [processDescription, setProcessDescription] = useState("")
  const [lastResult, setlastResult] = useState<any>()

  const defaultValues: Partial<ItemType> = props.item ?? {}
  const form = useForm<ItemType>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ItemType) {
    setProcessTitle("Saving profile")
    setProcessDescription("Please wait while we save your profile.")
    setProcessPercentage(0)
    setProcessing(true)
  }

  useEffect(() => {
    if (item) {
      form.reset(item)
    }
  }, [form, item])

  return (
    <div>
      <div className="flex">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="field_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reg. no.</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="field_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ContactPerson"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="PrimaryLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      value={field.value ? field.value?.LookupValue : ""}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save</Button>
          </form>
        </Form>

        <ProcessStatusOverlay
          done={!processing}
          title={processTitle}
          description={processDescription}
          progress={processPercentage}
        />
      </div>
    </div>
  )
}
