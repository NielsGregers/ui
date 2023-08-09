import z from "zod"
	// Generated by pnp2ts - do not edit
	export namespace brand_identity {
		export const listName = "brand_identity"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		})}export namespace Companies {
		export const listName = "Companies"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		field_1: item.fields.field_1 ? item.fields.field_1 : "",
			field_2: item.fields.field_2 ? item.fields.field_2 : "",
			field_3: item.fields.field_3 ? item.fields.field_3 : "",
			field_4: item.fields.field_4 ? item.fields.field_4 : "",
			field_5: item.fields.field_5 ? item.fields.field_5 : "",
			field_6: item.fields.field_6 ? item.fields.field_6 : "",
			field_7: item.fields.field_7,
			field_8: item.fields.field_8 ? item.fields.field_8 : "",
			field_9: item.fields.field_9,
			field_10: item.fields.field_10 ? item.fields.field_10 : "",
			field_11: item.fields.field_11 ? item.fields.field_11 : "",
			field_12: item.fields.field_12 ? item.fields.field_12 : "",
			field_13: item.fields.field_13 ? item.fields.field_13 : "",
			field_14: item.fields.field_14 ? item.fields.field_14 : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		field_1 : z.string(),
			field_2 : z.string(),
			field_3 : z.string(),
			field_4 : z.string(),
			field_5 : z.string(),
			field_6 : z.string(),
			field_7 : z.string().nullable(),
			field_8 : z.string(),
			field_9 : z.string().nullable(),
			field_10 : z.string(),
			field_11 : z.string(),
			field_12 : z.string(),
			field_13 : z.string(),
			field_14 : z.string(),
			})}export namespace CopyofSharedDocuments {
		export const listName = "Copy of Shared Documents"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		lcf76f155ced4ddcb4097134ff3c332f: item.fields.lcf76f155ced4ddcb4097134ff3c332f ? item.fields.lcf76f155ced4ddcb4097134ff3c332f : "",
			MediaServiceOCR: item.fields.MediaServiceOCR ? item.fields.MediaServiceOCR : "",
			MediaServiceLocation: item.fields.MediaServiceLocation ? item.fields.MediaServiceLocation : "",
			SharedWithDetails: item.fields.SharedWithDetails ? item.fields.SharedWithDetails : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		lcf76f155ced4ddcb4097134ff3c332f : z.string(),
			MediaServiceOCR : z.string(),
			MediaServiceLocation : z.string(),
			SharedWithDetails : z.string(),
			})}export namespace Countries {
		export const listName = "Countries"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		Code: item.fields.Code ? item.fields.Code : "",
			SortOrder: item.fields.SortOrder,
			Region: item.fields.Region ?? "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		Code : z.string(),
			SortOrder : z.number(),
			Region : z.string().nullable(),
			})}export namespace Documents {
		export const listName = "Documents"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		})}export namespace Events {
		export const listName = "Events"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		BannerImageUrl: item.fields.BannerImageUrl ? item.fields.BannerImageUrl : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		BannerImageUrl : z.string(),
			})}export namespace FormTemplates {
		export const listName = "Form Templates"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		})}export namespace GroupRegulatorySystem {
		export const listName = "Group Regulatory System"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		DocumentCode: item.fields.DocumentCode ? item.fields.DocumentCode : "",
			ApprovalDate: new Date(item.fields.ApprovalDate),
			ShowNewLabeluntil: new Date(item.fields.ShowNewLabeluntil),
			ShowUpdateLabelUntil: new Date(item.fields.ShowUpdateLabelUntil),
			EffectiveDate: new Date(item.fields.EffectiveDate),
			DocumentVersion: item.fields.DocumentVersion ? item.fields.DocumentVersion : "",
			DocumentTitle: item.fields.DocumentTitle ? item.fields.DocumentTitle : "",
			Process: item.fields.Process ? item.fields.Process : "",
			ContactPerson: item.fields.ContactPerson ? item.fields.ContactPerson : "",
			NotesCurrentDocument: item.fields.NotesCurrentDocument ? item.fields.NotesCurrentDocument : "",
			CrossReferenceOtherRegulations: item.fields.CrossReferenceOtherRegulations ? item.fields.CrossReferenceOtherRegulations : "",
			ProcessOwner: item.fields.ProcessOwner ? item.fields.ProcessOwner : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		DocumentCode : z.string(),
			ApprovalDate : z.date(),
			ShowNewLabeluntil : z.date(),
			ShowUpdateLabelUntil : z.date(),
			EffectiveDate : z.date(),
			DocumentVersion : z.string(),
			DocumentTitle : z.string(),
			Process : z.string(),
			ContactPerson : z.string(),
			NotesCurrentDocument : z.string(),
			CrossReferenceOtherRegulations : z.string(),
			ProcessOwner : z.string(),
			})}export namespace Links {
		export const listName = "Links"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		Description: item.fields.Description ? item.fields.Description : "",
			Slug: item.fields.Slug ? item.fields.Slug : "",
			URL: item.fields.URL ? item.fields.URL : "",
			Image: item.fields.Image ? item.fields.Image : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		Description : z.string(),
			Slug : z.string(),
			URL : z.string(),
			Image : z.string(),
			})}export namespace NewsChannels {
		export const listName = "News Channels"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		Category: item.fields.Category ?? "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		Category : z.string().nullable(),
			})}export namespace SiteAssets {
		export const listName = "Site Assets"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		lcf76f155ced4ddcb4097134ff3c332f: item.fields.lcf76f155ced4ddcb4097134ff3c332f ? item.fields.lcf76f155ced4ddcb4097134ff3c332f : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		lcf76f155ced4ddcb4097134ff3c332f : z.string(),
			})}export namespace SitePages {
		export const listName = "Site Pages"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		})}export namespace StyleLibrary {
		export const listName = "Style Library"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		})}export namespace Test_copy_paste_mele {
		export const listName = "Test_copy_paste_mele"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		gggggg: item.fields.gggggg ? item.fields.gggggg : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		gggggg : z.string(),
			})}export namespace Test_import {
		export const listName = "Test_import"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		})}export namespace Units {
		export const listName = "Units"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		code: item.fields.code ? item.fields.code : "",
			SortOrder: item.fields.SortOrder,
			UnitType: item.fields.UnitType ?? "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		code : z.string(),
			SortOrder : z.number(),
			UnitType : z.string().nullable(),
			})}export namespace Video {
		export const listName = "Video"
		
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	CreatedBy : item.createdBy.user.email,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email,
	Modified : new Date(item.lastModifiedDateTime),	
		}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		Title: z.string(),
		
		})}