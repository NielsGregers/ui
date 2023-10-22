
	import z from "zod"

		export const listName = "Desks"
		export const listURL = "Lists/Desks"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Email"|"ProvisioningStatus"|"LocationonWorkspace"|"Last_x0020_PowerShell_x0020_Comm"|"RestrictedTo"|"DeskNumber"|"_ColorTag"
	export const dependencies =[]
	
	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Desks
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		Email: item.fields.Email ? item.fields.Email : "",
			ProvisioningStatus: item.fields.ProvisioningStatus ?? "",
			LocationonWorkspace: item.fields.LocationonWorkspace ? item.fields.LocationonWorkspace : "",
			Last_x0020_PowerShell_x0020_Comm: item.fields.Last_x0020_PowerShell_x0020_Comm ? item.fields.Last_x0020_PowerShell_x0020_Comm : "",
			RestrictedTo: item.fields.RestrictedTo ? item.fields.RestrictedTo : "",
			DeskNumber: item.fields.DeskNumber ? item.fields.DeskNumber : "",
			_ColorTag: item.fields._ColorTag ? item.fields._ColorTag : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		Email : z.string(),
			ProvisioningStatus : z.string().nullable(),
			LocationonWorkspace : z.string(),
			Last_x0020_PowerShell_x0020_Comm : z.string(),
			RestrictedTo : z.string(),
			DeskNumber : z.string(),
			_ColorTag : z.string(),
			})
	
	export type ItemType = z.infer<typeof schema>
	