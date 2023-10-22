
	import z from "zod"

		export const listName = "Shared Mailboxes Owners"
		export const listURL = "Lists/Shared Mailboxes Owners"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Owners"|"State"|"_ColorTag"|"VIP"
	export const dependencies =[]
	
	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Shared Mailboxes Owners
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		State: item.fields.State ?? "",
			_ColorTag: item.fields._ColorTag ? item.fields._ColorTag : "",
			VIP: item.fields.VIP ? true : false,
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		State : z.string().nullable(),
			_ColorTag : z.string(),
			VIP : z.boolean(),
			})
	
	export type ItemType = z.infer<typeof schema>
	