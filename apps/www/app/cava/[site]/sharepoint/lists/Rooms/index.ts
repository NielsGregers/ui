
	import z from "zod"

		export const listName = "Rooms"
		export const listURL = "Lists/Rooms"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"LocationonFloor"|"FloorMapZoom"|"Provisioning_x0020_Status"|"Email"|"Capacity"|"RestrictedTo"|"TeamsMeetingRoom"|"Canbeusedforreceptions"|"DeviceSerialNumber"|"Price_x0020_List"|"CiscoVideo"|"Production"|"_ColorTag"|"Comments"
	export const dependencies =["Pricelists2"]
	
	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Rooms
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		LocationonFloor: item.fields.LocationonFloor ? item.fields.LocationonFloor : "",
			FloorMapZoom: item.fields.FloorMapZoom ? item.fields.FloorMapZoom : "",
			Provisioning_x0020_Status: item.fields.Provisioning_x0020_Status ?? "",
			Email: item.fields.Email ? item.fields.Email : "",
			Capacity: item.fields.Capacity,
			RestrictedTo: item.fields.RestrictedTo ? item.fields.RestrictedTo : "",
			TeamsMeetingRoom: item.fields.TeamsMeetingRoom ? true : false,
			Canbeusedforreceptions: item.fields.Canbeusedforreceptions ? true : false,
			DeviceSerialNumber: item.fields.DeviceSerialNumber ? item.fields.DeviceSerialNumber : "",
			Price_x0020_List: mapLookup("Pricelists2",item.fields.Price_x0020_ListLookupId),
			CiscoVideo: item.fields.CiscoVideo ? true : false,
			Production: item.fields.Production ? true : false,
			_ColorTag: item.fields._ColorTag ? item.fields._ColorTag : "",
			Comments: item.fields.Comments ? item.fields.Comments : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		LocationonFloor : z.string(),
			FloorMapZoom : z.string(),
			Provisioning_x0020_Status : z.string().nullable(),
			Email : z.string(),
			Capacity : z.number(),
			RestrictedTo : z.string(),
			TeamsMeetingRoom : z.boolean(),
			Canbeusedforreceptions : z.boolean(),
			DeviceSerialNumber : z.string(),
			Price_x0020_List : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			CiscoVideo : z.boolean(),
			Production : z.boolean(),
			_ColorTag : z.string(),
			Comments : z.string(),
			})
	
	export type ItemType = z.infer<typeof schema>
	