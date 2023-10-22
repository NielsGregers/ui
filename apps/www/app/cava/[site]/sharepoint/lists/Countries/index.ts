
	import z from "zod"

		export const listName = "Countries"
		export const listURL = "Lists/Countries"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Countrycode"|"Flag"|"Locations"|"_ColorTag"
	export const dependencies =["Locations"]
	
	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Countries
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		Countrycode: item.fields.Countrycode ? item.fields.Countrycode : "",
			Flag: item.fields.Flag ? item.fields.Flag : "",
			Locations: mapLookupMulti("Locations",item.fields.LocationsLookupId),
			_ColorTag: item.fields._ColorTag ? item.fields._ColorTag : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		Countrycode : z.string(),
			Flag : z.string(),
			Locations : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			_ColorTag : z.string(),
			})
	
	export type ItemType = z.infer<typeof schema>
	