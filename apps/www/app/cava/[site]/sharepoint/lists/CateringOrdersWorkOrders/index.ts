
	import z from "zod"

		export const listName = "Catering Orders Work Orders"
		export const listURL = "Lists/Catering Orders Work Orders"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Amount"|"Sales_x0020_Order"|"WorkOrderHTML"|"Provider"|"_ColorTag"
	export const dependencies =["Catering Orders","Catering Providers"]
	
	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Catering Orders Work Orders
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		Amount: item.fields.Amount,
			Sales_x0020_Order: mapLookup("Catering Orders",item.fields.Sales_x0020_OrderLookupId),
			WorkOrderHTML: item.fields.WorkOrderHTML ? item.fields.WorkOrderHTML : "",
			Provider: mapLookup("Catering Providers",item.fields.ProviderLookupId),
			_ColorTag: item.fields._ColorTag ? item.fields._ColorTag : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		Amount : z.number(),
			Sales_x0020_Order : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			WorkOrderHTML : z.string(),
			Provider : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			_ColorTag : z.string(),
			})
	
	export type ItemType = z.infer<typeof schema>
	