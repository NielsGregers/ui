import z from "zod"
	// Generated by pnp2ts - do not edit


	function mapLookup(item:any) {
		if (!item) return null
		return {
			LookupId: item.LookupId,
			LookupValue: item.LookupValue
		}
	}

	function mapLookupMulti(items:any[]) {
		if (!items) return []
		return items.map(item =>
		{
			return {LookupId: item.LookupId,
				LookupValue: item.LookupValue}
		})
	}

	
		type  SP_Documents struct {
		Title string `"json:Title"` 
	}
		var  SP_Documents_Fields = []string{}
		var  SP_Documents_Dependencies = []string{}
		type  Documents struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	}
		type  SP_Environments struct {
		Title string `"json:Title"` 
	}
		var  SP_Environments_Fields = []string{}
		var  SP_Environments_Dependencies = []string{}
		type  Environments struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	}
		type  SP_Epics struct {
		Title string `"json:Title"` 
	Features []shared.LookupReference `"json:Features"`
			Features_x003a__x0020_cost []shared.LookupReference `"json:Features_x003a__x0020_Cost"`
			Nextmilestone time.Time `"json:Nextmilestone"`
			}
		var  SP_Epics_Fields = []string{"Features","Features_x003a__x0020_Cost","Nextmilestone"}
		var  SP_Epics_Dependencies = []string{"Features"}
		type  Epics struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	Features Features `"json:Features"`
			Features_x003a__x0020_Cost Features `"json:Features_x003a__x0020_Cost"`
			Nextmilestone time.Time `"json:Nextmilestone"`
			}
		type  SP_Events struct {
		Title string `"json:Title"` 
	Bannerimageurl string `"json:BannerImageUrl"`
			}
		var  SP_Events_Fields = []string{"BannerImageUrl"}
		var  SP_Events_Dependencies = []string{}
		type  Events struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	BannerImageUrl float64 `"json:BannerImageUrl"`
			}
		type  SP_Features struct {
		Title string `"json:Title"` 
	Cost float64 `"json:Cost"`
			Nextmilestone time.Time `"json:Nextmilestone"`
			Usecases []shared.LookupReference `"json:UseCases"`
			}
		var  SP_Features_Fields = []string{"Cost","Nextmilestone","UseCases"}
		var  SP_Features_Dependencies = []string{"Request tracker"}
		type  Features struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	Cost string `"json:Cost"`
			Nextmilestone time.Time `"json:Nextmilestone"`
			UseCases Requesttracker `"json:UseCases"`
			}
		type  SP_FormTemplates struct {
		Title string `"json:Title"` 
	}
		var  SP_FormTemplates_Fields = []string{}
		var  SP_FormTemplates_Dependencies = []string{}
		type  FormTemplates struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	}
		type  SP_IssueTracker struct {
		Title string `"json:Title"` 
	Estimated_x0020_hours_x0020_to_x float64 `"json:Estimated_x0020_hours_x0020_to_x"`
			Description string `"json:Description"`
			Priority string `"json:Priority"`
			Status string `"json:Status"`
			Datereported time.Time `"json:DateReported"`
			Archived string `"json:Archived"`
			Suggestedsolutions string `"json:SuggestedSolutions"`
			Prioritysortorder float64 `"json:PrioritySortOrder"`
			}
		var  SP_IssueTracker_Fields = []string{"Estimated_x0020_hours_x0020_to_x","Description","Priority","Status","DateReported","Archived","SuggestedSolutions","PrioritySortOrder"}
		var  SP_IssueTracker_Dependencies = []string{}
		type  IssueTracker struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	Estimated_x0020_hours_x0020_to_x string `"json:Estimated_x0020_hours_x0020_to_x"`
			Description float64 `"json:Description"`
			DateReported time.Time `"json:DateReported"`
			SuggestedSolutions float64 `"json:SuggestedSolutions"`
			PrioritySortOrder string `"json:PrioritySortOrder"`
			}
		type  SP_Packages struct {
		Title string `"json:Title"` 
	Description string `"json:Description"`
			}
		var  SP_Packages_Fields = []string{"Description"}
		var  SP_Packages_Dependencies = []string{}
		type  Packages struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	Description float64 `"json:Description"`
			}
		type  SP_Releases struct {
		Title string `"json:Title"` 
	Releasedatetime time.Time `"json:Releasedatetime"`
			Stage string `"json:Stage"`
			Archived bool `"json:Archived"`
			Testplan string `"json:Testplan"`
			}
		var  SP_Releases_Fields = []string{"Releasedatetime","Stage","Archived","Testplan"}
		var  SP_Releases_Dependencies = []string{}
		type  Releases struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	Releasedatetime time.Time `"json:Releasedatetime"`
			Archived bool `"json:Archived"`
			Testplan float64 `"json:Testplan"`
			}
		type  SP_RequestTracker struct {
		Title string `"json:Title"` 
	Estimated_x0020_hours_x0020_to_x float64 `"json:Estimated_x0020_hours_x0020_to_x"`
			Description string `"json:Description"`
			Priority string `"json:Priority"`
			Status string `"json:Status"`
			Datereported time.Time `"json:DateReported"`
			Archived string `"json:Archived"`
			Suggestedsolutions string `"json:SuggestedSolutions"`
			Prioritysortorder float64 `"json:PrioritySortOrder"`
			}
		var  SP_RequestTracker_Fields = []string{"Estimated_x0020_hours_x0020_to_x","Description","Priority","Status","DateReported","Archived","SuggestedSolutions","PrioritySortOrder"}
		var  SP_RequestTracker_Dependencies = []string{}
		type  RequestTracker struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	Estimated_x0020_hours_x0020_to_x string `"json:Estimated_x0020_hours_x0020_to_x"`
			Description float64 `"json:Description"`
			DateReported time.Time `"json:DateReported"`
			SuggestedSolutions float64 `"json:SuggestedSolutions"`
			PrioritySortOrder string `"json:PrioritySortOrder"`
			}
		type  SP_Services struct {
		Title string `"json:Title"` 
	}
		var  SP_Services_Fields = []string{}
		var  SP_Services_Dependencies = []string{}
		type  Services struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	}
		type  SP_SiteAssets struct {
		Title string `"json:Title"` 
	Lcf76f155ced4ddcb4097134ff3c332f string `"json:lcf76f155ced4ddcb4097134ff3c332f"`
			Mediaserviceocr string `"json:MediaServiceOCR"`
			}
		var  SP_SiteAssets_Fields = []string{"lcf76f155ced4ddcb4097134ff3c332f","MediaServiceOCR"}
		var  SP_SiteAssets_Dependencies = []string{}
		type  SiteAssets struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	lcf76f155ced4ddcb4097134ff3c332f float64 `"json:lcf76f155ced4ddcb4097134ff3c332f"`
			MediaServiceOCR float64 `"json:MediaServiceOCR"`
			}
		type  SP_SitePages struct {
		Title string `"json:Title"` 
	}
		var  SP_SitePages_Fields = []string{}
		var  SP_SitePages_Dependencies = []string{}
		type  SitePages struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	}
		type  SP_StyleLibrary struct {
		Title string `"json:Title"` 
	}
		var  SP_StyleLibrary_Fields = []string{}
		var  SP_StyleLibrary_Dependencies = []string{}
		type  StyleLibrary struct {
		Title string `"json:Title"` 
	Created time.Time `"json:Created"` 
	Editorid int `"json:EditorId"` 
	Guid string `"json:GUID"` 
	Id int `"json:ID"` 
	Modified time.Time `"json:Modified"` 
	Authorid int `"json:AuthorId"` 
	}