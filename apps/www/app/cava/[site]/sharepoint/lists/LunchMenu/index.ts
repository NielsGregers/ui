
	import z from "zod"

		export const listName = "Lunch Menu"
		export const listURL = "Lists/Lunch Menu"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"_ColorTag"|"Location"|"Date"|"Picture"
	export const dependencies =["Locations"]
	
	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Lunch Menu
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		_ColorTag: item.fields._ColorTag ? item.fields._ColorTag : "",
			Location: mapLookup("Locations",item.fields.LocationLookupId),
			Date: new Date(item.fields.Date),
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		_ColorTag : z.string(),
			Location : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Date : z.date(),
			})
	
	export type ItemType = z.infer<typeof schema>
	