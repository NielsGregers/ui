


"use client"
import * as React from "react"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import * as z from "zod"

import { schema, ItemType } from "."
import { IProgressProps, ProcessStatusOverlay } from "@/components/progress"


import {
	Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/registry/new-york/ui/form"

import { Input } from "@/registry/new-york/ui/input"
import { Button } from "@/registry/new-york/ui/button"
import { Textarea } from "@/registry/default/ui/textarea"
import { UpdateWhocanBook } from "./server"
import { set } from "date-fns"
import { redirect } from "next/navigation"
import Link from "next/link"

export function LimitAccessToRoomForm(props: { item?: ItemType, backPath?: string }) {
	const { item } = props
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
		setProcessTitle("Updating Room")
		setProcessDescription("Please wait while your request is processed in Microsoft 365")
		setProcessPercentage(0)
		setProcessing(true)
		const { script, result } = await UpdateWhocanBook(item as ItemType)
		setProcessPercentage(100)
		if (result.hasError) {
			alert(result.errorMessage + "/n/n" + script)
		} else {
			alert("Success")
		}
		setProcessing(false)


	}


	useEffect(() => {
		if (item) {
			form.reset(item)
		}
	}, [form, item])



	return (
		<div>

			<div className="ml-5 flex">
				<Form {...form}>

					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
							control={form.control}
							name="Email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="" {...field} disabled value={field.value ?? ""} />
									</FormControl>
									<FormDescription>

									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="RestrictedTo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Restricted To</FormLabel>
									<FormControl>
										<div className="flex">
										<Textarea placeholder="" {...field} value={field.value ?? ""} className="h-[200px] w-[400px]" />
										<div>
											<div>
										<Button onClick={(e)=>form.setValue("RestrictedTo",form.getValues("RestrictedTo").replaceAll(",","\n"))} variant={"link"} type="button" className="text-sm">Split</Button>
										<Button onClick={(e)=>form.setValue("RestrictedTo",form.getValues("RestrictedTo").replaceAll("\n",","))} variant={"link"} type="button" className="text-sm">Join</Button>
										</div>
										</div>
										</div>
									</FormControl>
									<FormDescription>

									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<Button
							type="submit"

						>
							Save
						</Button>
						{props.backPath &&
						<Button className="ml-3" type="button" variant="secondary" ><Link href={props.backPath}> Back</Link></Button>}
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










