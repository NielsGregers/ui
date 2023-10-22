
	import z from "zod"

		export const listName = "Buildings"
		export const listURL = "Lists/Buildings"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Wheelchair"|"Image"|"Floors"|"HasWorkspaces"|"_ColorTag"
	export const dependencies =["Floors"]
	
	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Buildings
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		Wheelchair: item.fields.Wheelchair ? true : false,
			Image: item.fields.Image ? item.fields.Image : "",
			Floors: mapLookupMulti("Floors",item.fields.FloorsLookupId),
			HasWorkspaces: item.fields.HasWorkspaces ? true : false,
			_ColorTag: item.fields._ColorTag ? item.fields._ColorTag : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		Wheelchair : z.boolean(),
			Image : z.string(),
			Floors : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			HasWorkspaces : z.boolean(),
			_ColorTag : z.string(),
			})
	
	export type ItemType = z.infer<typeof schema>
	