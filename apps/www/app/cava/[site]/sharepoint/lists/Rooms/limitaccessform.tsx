


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
import { UpdateWhoCanBook } from "./server"
import { set } from "date-fns"

export function LimitAccessToRoomForm(props: { item?: ItemType }) {
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
		const script = await UpdateWhoCanBook(item as ItemType)
	setProcessing(false)

		alert(script)
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
							name="RestrictedTo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Restricted To</FormLabel>
									<FormControl>
										<Textarea placeholder="" {...field} value={field.value ?? ""} className="h-[200px] w-[400px]" />

									</FormControl>
									<FormDescription>

									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField


							control={form.control}
							name="Provisioning_x0020_Status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Provisioning Status</FormLabel>
									<FormControl>
										<Input placeholder="" {...field} disabled value={field.value ?? ""} />
									</FormControl>
									<FormDescription>

									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/><FormField
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
						/><FormField
							control={form.control}
							name="Capacity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Capacity</FormLabel>
									<FormControl>
										<Input placeholder="" disabled {...field} value={field.value ?? ""} />
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










