
	import z from "zod"

		export const listName = "Currency"
		export const listURL = "Lists/Currency"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"EURrate"|"_ColorTag"
	export const dependencies =[]
	
	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Currency
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		EURrate: item.fields.EURrate,
			_ColorTag: item.fields._ColorTag ? item.fields._ColorTag : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		EURrate : z.number(),
			_ColorTag : z.string(),
			})
	
	export type ItemType = z.infer<typeof schema>
	