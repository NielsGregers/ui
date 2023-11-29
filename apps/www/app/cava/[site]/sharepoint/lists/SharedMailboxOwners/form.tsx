

	
	"use client"
	import * as React from "react"
	
	import { useEffect, useState } from "react"
	import { zodResolver } from "@hookform/resolvers/zod"
	
	import { useForm } from "react-hook-form"
	import * as z from "zod"
	
	import {schema,ItemType} from "."
	import { IProgressProps, ProcessStatusOverlay } from "@/components/progress"
	
	
	import {
		Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
	} from "@/registry/new-york/ui/form"
	
	import { Input } from "@/registry/new-york/ui/input"
	import { Button } from "@/registry/new-york/ui/button"
	
	export function ItemForm(props: { item?: ItemType }) {
		const {item} = props
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
		}, [form,item])
	
	
	
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
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Owners"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Owners</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??"" }/>
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="State"
			render={({ field }) => (
				<FormItem>
					<FormLabel>State</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??"" }/>
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
	
	
	
	
			
		



		
	