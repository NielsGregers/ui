

	
	

	
	"use client"

	import * as React from "react"
	
	import {schema,listName} from "."
	import {ItemForm} from "./form"
	
	import {MODULENAME, useSharePointList, useSharePointListItem, version} from "@/app/sharepoint"
	
	import {MagicboxContext} from "@/app/magicbox-context"
import { GenericItem } from "@/components/table/data/schema"
import { ColumnDef } from "@tanstack/react-table"



import Link from "next/link"
import { Button } from "@/registry/new-york/ui/button"
import { GenericTable } from "@/components/table"
	
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"	
	
	
	export default function ItemPage({params}:{params:{site:string}}) {
	
		const magicbox = React.useContext(MagicboxContext)
		const {site} = params
		const tenant = magicbox.tenant
		const {items,error,isLoading} = useSharePointList(magicbox.session?.accessToken ?? "", tenant,site, listName)
	
	
		const col1: ColumnDef<GenericItem<any>> = {
			id: "string1",
			accessorKey: "string1",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Delivery Time" />
			),
			cell: ({ row }) => <Link href={"/cava/"+site+"/sharepoint/lists/"+listName.replace(" ","")+"/"+row.original.id}> <Button variant={"link"}>View</Button></Link>,
			enableSorting: true,
			enableHiding: true,
		}
		return (
			<div className="container"  style={{minHeight:"100vh"}}>
			{isLoading && <div>Loading...</div>}
				{error && <div className="text-red-700">{error}</div>}
				<GenericTable
                addtionalColumns={[col1]}

                data={items.map((item:any) => {

                    const genericItem: GenericItem<any> = {

                        id: item.fields.id,
                        title: item.fields.Title,
                    
                    }
                    return genericItem

                })} />
			</div>
		)
	
	
	}
	
	
	
	
			
		



		
	
			
		



		
	