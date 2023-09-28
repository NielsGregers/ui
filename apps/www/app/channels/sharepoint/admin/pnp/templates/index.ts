"use server"
import path from "path"
import fs from "fs"
import {XMLParser,XMLBuilder,XMLValidator} from "fast-xml-parser"
export interface PnpTemplateFile {
    "?xml": Xml
    "pnp:Provisioning": PnpProvisioning
  }
  
  export interface Xml {
    "@_version": string
    "@_encoding": string
  }
  
  export interface PnpProvisioning {
    "pnp:Preferences": PnpPreferences
    "pnp:Templates": PnpTemplates
    "@_xmlns:pnp": string
  }
  
  export interface PnpPreferences {
    "@_Generator": string
  }
  
  export interface PnpTemplates {
    "pnp:ProvisioningTemplate": PnpProvisioningTemplate
    "@_ID": string
  }
  
  export interface PnpProvisioningTemplate {
    "pnp:WebSettings": PnpWebSettings
    "pnp:SiteSettings": PnpSiteSettings
    "pnp:RegionalSettings": PnpRegionalSettings
    "pnp:SupportedUILanguages": PnpSupportedUilanguages
    "pnp:PropertyBagEntries": PnpPropertyBagEntries
    "pnp:Security": PnpSecurity
    "pnp:Navigation": PnpNavigation
    "pnp:SiteFields": PnpSiteFields
    "pnp:Lists": PnpLists
    "pnp:Features": PnpFeatures
    "pnp:CustomActions": PnpCustomActions
    "pnp:Files": PnpFiles
    "pnp:ComposedLook": PnpComposedLook
    "pnp:ApplicationLifecycleManagement": PnpApplicationLifecycleManagement
    "pnp:ClientSidePages": PnpClientSidePages
    "pnp:Header": PnpHeader3
    "pnp:Footer": PnpFooter
    "@_ID": string
    "@_Version": string
    "@_BaseSiteTemplate": string
    "@_Scope": string
  }
  
  export interface PnpWebSettings {
    "@_RequestAccessEmail": string
    "@_NoCrawl": string
    "@_WelcomePage": string
    "@_SiteLogo": string
    "@_AlternateCSS": string
    "@_MasterPageUrl": string
    "@_CustomMasterPageUrl": string
    "@_CommentsOnSitePagesDisabled": string
    "@_QuickLaunchEnabled": string
    "@_MembersCanShare": string
    "@_HorizontalQuickLaunch": string
    "@_SearchScope": string
    "@_SearchBoxInNavBar": string
  }
  
  export interface PnpSiteSettings {
    "@_AllowDesigner": string
    "@_AllowCreateDeclarativeWorkflow": string
    "@_AllowSaveDeclarativeWorkflowAsTemplate": string
    "@_AllowSavePublishDeclarativeWorkflow": string
    "@_SearchBoxInNavBar": string
    "@_SearchCenterUrl": string
  }
  
  export interface PnpRegionalSettings {
    "@_AdjustHijriDays": string
    "@_AlternateCalendarType": string
    "@_CalendarType": string
    "@_Collation": string
    "@_FirstDayOfWeek": string
    "@_FirstWeekOfYear": string
    "@_LocaleId": string
    "@_ShowWeeks": string
    "@_Time24": string
    "@_TimeZone": string
    "@_WorkDayEndHour": string
    "@_WorkDays": string
    "@_WorkDayStartHour": string
  }
  
  export interface PnpSupportedUilanguages {
    "pnp:SupportedUILanguage": PnpSupportedUilanguage[]
  }
  
  export interface PnpSupportedUilanguage {
    "@_LCID": string
  }
  
  export interface PnpPropertyBagEntries {
    "pnp:PropertyBagEntry": PnpPropertyBagEntry[]
  }
  
  export interface PnpPropertyBagEntry {
    "@_Key": string
    "@_Value": string
    "@_Overwrite": string
    "@_Indexed"?: string
  }
  
  export interface PnpSecurity {
    "pnp:AdditionalAdministrators": PnpAdditionalAdministrators
    "pnp:AdditionalOwners": PnpAdditionalOwners
    "pnp:AdditionalMembers": PnpAdditionalMembers
    "pnp:AdditionalVisitors": PnpAdditionalVisitors
    "pnp:Permissions": PnpPermissions
    "@_AssociatedOwnerGroup": string
    "@_AssociatedMemberGroup": string
    "@_AssociatedVisitorGroup": string
  }
  
  export interface PnpAdditionalAdministrators {
    "pnp:User": PnpUser[]
  }
  
  export interface PnpUser {
    "@_Name": string
  }
  
  export interface PnpAdditionalOwners {
    "pnp:User": PnpUser2[]
  }
  
  export interface PnpUser2 {
    "@_Name": string
  }
  
  export interface PnpAdditionalMembers {
    "pnp:User": PnpUser3[]
  }
  
  export interface PnpUser3 {
    "@_Name": string
  }
  
  export interface PnpAdditionalVisitors {
    "pnp:User": PnpUser4[]
  }
  
  export interface PnpUser4 {
    "@_Name": string
  }
  
  export interface PnpPermissions {
    "pnp:RoleAssignments": PnpRoleAssignments
  }
  
  export interface PnpRoleAssignments {
    "pnp:RoleAssignment": PnpRoleAssignment[]
  }
  
  export interface PnpRoleAssignment {
    "@_Principal": string
    "@_RoleDefinition": string
  }
  
  export interface PnpNavigation {
    "pnp:GlobalNavigation": PnpGlobalNavigation
    "pnp:CurrentNavigation": PnpCurrentNavigation
    "@_AddNewPagesToNavigation": string
    "@_CreateFriendlyUrlsForNewPages": string
  }
  
  export interface PnpGlobalNavigation {
    "pnp:StructuralNavigation": PnpStructuralNavigation
    "@_NavigationType": string
  }
  
  export interface PnpStructuralNavigation {
    "pnp:NavigationNode": PnpNavigationNode[]
    "@_RemoveExistingNodes": string
  }
  
  export interface PnpNavigationNode {
    "@_Title": string
    "@_Url": string
    "@_IsExternal"?: string
  }
  
  export interface PnpCurrentNavigation {
    "pnp:StructuralNavigation": PnpStructuralNavigation2
    "@_NavigationType": string
  }
  
  export interface PnpStructuralNavigation2 {
    "pnp:NavigationNode": PnpNavigationNode2[]
    "@_RemoveExistingNodes": string
  }
  
  export interface PnpNavigationNode2 {
    "pnp:NavigationNode"?: PnpNavigationNode3[]
    "@_Title": string
    "@_Url": string
    "@_IsExternal"?: string
  }
  
  export interface PnpNavigationNode3 {
    "@_Title": string
    "@_Url": string
  }
  
  export interface PnpSiteFields {
    Field: Field[]
  }
  
  export interface Field {
    "@_ID": string
    "@_StaticName": string
    "@_Name": string
    "@_DisplayName": string
    "@_Type": string
    "@_Format"?: string
    "@_Required"?: string
    "@_Group": string
    "@_ClientSideComponentId"?: string
    "@_SourceID": string
    CHOICES?: Choices
    "@_Description"?: string
    "@_AllowDeletion"?: string
    "@_ReadOnly"?: string
    "@_ShowInNewForm"?: string
    "@_ShowInEditForm"?: string
    "@_ShowInDisplayForm"?: string
    "@_ShowInViewForms"?: string
    "@_ShowInListSettings"?: string
    "@_ShowInVersionHistory"?: string
    Default?: string
    "@_Mult"?: string
    "@_Sealed"?: string
    "@_Viewable"?: string
  }
  
  export interface Choices {
    CHOICE: string[]
  }
  
  export interface PnpLists {
    "pnp:ListInstance": PnpListInstance[]
  }
  
  export interface PnpListInstance {
    "pnp:ContentTypeBindings": PnpContentTypeBindings
    "pnp:Views": PnpViews
    "pnp:Fields": PnpFields
    "pnp:FieldRefs": PnpFieldRefs
    "pnp:Security"?: PnpSecurity2
    "@_Title": string
    "@_Description": string
    "@_DocumentTemplate": string
    "@_OnQuickLaunch"?: string
    "@_TemplateType": string
    "@_Url": string
    "@_EnableVersioning"?: string
    "@_MinorVersionLimit": string
    "@_MaxVersionLimit": string
    "@_DraftVersionVisibility": string
    "@_TemplateFeatureID": string
    "@_EnableAttachments"?: string
    "@_DefaultDisplayFormUrl": string
    "@_DefaultEditFormUrl": string
    "@_DefaultNewFormUrl": string
    "@_ImageUrl": string
    "@_IrmExpire": string
    "@_IrmReject": string
    "@_IsApplicationList": string
    "@_ValidationFormula": string
    "@_ValidationMessage": string
    "pnp:FieldDefaults"?: PnpFieldDefaults
    "@_ContentTypesEnabled"?: string
    "@_EnableFolderCreation"?: string
    "pnp:PropertyBagEntries"?: PnpPropertyBagEntries2
    "@_EnableMinorVersions"?: string
  }
  
  export interface PnpContentTypeBindings {
    "pnp:ContentTypeBinding": any
  }
  
  export interface PnpViews {
    View: any
  }
  
  export interface PnpFields {
    Field: any
  }
  
  export interface PnpFieldRefs {
    "pnp:FieldRef": PnpFieldRef[]
  }
  
  export interface PnpFieldRef {
    "@_ID": string
    "@_Name": string
    "@_DisplayName": string
    "@_Required"?: string
  }
  
  export interface PnpSecurity2 {
    "pnp:BreakRoleInheritance": PnpBreakRoleInheritance
  }
  
  export interface PnpBreakRoleInheritance {
    "pnp:RoleAssignment": PnpRoleAssignment2[]
    "@_CopyRoleAssignments": string
    "@_ClearSubscopes": string
  }
  
  export interface PnpRoleAssignment2 {
    "@_Principal": string
    "@_RoleDefinition": string
  }
  
  export interface PnpFieldDefaults {
    "pnp:FieldDefault": PnpFieldDefault
  }
  
  export interface PnpFieldDefault {
    "@_FieldName": string
  }
  
  export interface PnpPropertyBagEntries2 {
    "pnp:PropertyBagEntry": PnpPropertyBagEntry2
  }
  
  export interface PnpPropertyBagEntry2 {
    "@_Key": string
    "@_Value": string
    "@_Overwrite": string
  }
  
  export interface PnpFeatures {
    "pnp:SiteFeatures": PnpSiteFeatures
    "pnp:WebFeatures": PnpWebFeatures
  }
  
  export interface PnpSiteFeatures {
    "pnp:Feature": PnpFeature[]
  }
  
  export interface PnpFeature {
    "@_ID": string
  }
  
  export interface PnpWebFeatures {
    "pnp:Feature": PnpFeature2[]
  }
  
  export interface PnpFeature2 {
    "@_ID": string
  }
  
  export interface PnpCustomActions {
    "pnp:WebCustomActions": PnpWebCustomActions
  }
  
  export interface PnpWebCustomActions {
    "pnp:CustomAction": PnpCustomAction[]
  }
  
  export interface PnpCustomAction {
    "@_Name": string
    "@_Location": string
    "@_Title": string
    "@_Sequence": string
    "@_Rights": string
    "@_RegistrationType": string
    "@_ClientSideComponentId": string
    "@_ClientSideComponentProperties": string
  }
  
  export interface PnpFiles {
    "pnp:File": PnpFile[]
  }
  
  export interface PnpFile {
    "@_Src": string
    "@_Folder": string
    "@_Overwrite": string
    "@_Level": string
  }
  
  export interface PnpComposedLook {
    "@_Name": string
    "@_ColorFile": string
    "@_FontFile": string
    "@_BackgroundFile": string
    "@_Version": string
  }
  
  export interface PnpApplicationLifecycleManagement {
    "pnp:Apps": PnpApps
  }
  
  export interface PnpApps {
    "pnp:App": PnpApp[]
  }
  
  export interface PnpApp {
    "@_AppId": string
    "@_Action": string
  }
  
  export interface PnpClientSidePages {
    "pnp:ClientSidePage": PnpClientSidePage[]
  }
  
  export interface PnpClientSidePage {
    "pnp:Header": PnpHeader
    "pnp:Sections": PnpSections
    "pnp:Translations"?: PnpTranslations
    "@_PromoteAsNewsArticle": string
    "@_PromoteAsTemplate": string
    "@_Overwrite": string
    "@_Layout"?: string
    "@_EnableComments"?: string
    "@_Title": string
    "@_ThumbnailUrl": string
    "@_PageName": string
    "@_LCID"?: string
    "@_CreateTranslations"?: string
  }
  
  export interface PnpHeader {
    "@_Type": string
    "@_LayoutType": string
    "@_ShowTopicHeader": string
    "@_ShowPublishDate": string
    "@_ShowBackgroundGradient": string
    "@_TopicHeader": string
    "@_AlternativeText": string
    "@_Authors": string
    "@_AuthorByLineId": string
    "@_ServerRelativeImageUrl"?: string
    "@_TranslateX"?: string
    "@_TranslateY"?: string
    "@_AuthorByLine"?: string
  }
  
  export interface PnpSections {
    "pnp:Section": any
  }
  
  export interface PnpTranslations {
    "pnp:ClientSidePage": PnpClientSidePage2
  }
  
  export interface PnpClientSidePage2 {
    "pnp:Header": PnpHeader2
    "pnp:Sections": PnpSections2
    "@_PromoteAsNewsArticle": string
    "@_PromoteAsTemplate": string
    "@_Overwrite": string
    "@_EnableComments"?: string
    "@_Title": string
    "@_ThumbnailUrl": string
    "@_LCID": string
    "@_PageName": string
    "@_Layout"?: string
  }
  
  export interface PnpHeader2 {
    "@_Type": string
    "@_ServerRelativeImageUrl"?: string
    "@_LayoutType": string
    "@_ShowTopicHeader": string
    "@_ShowPublishDate": string
    "@_ShowBackgroundGradient": string
    "@_TopicHeader": string
    "@_AlternativeText": string
    "@_Authors": string
    "@_AuthorByLine"?: string
    "@_AuthorByLineId": string
    "@_TranslateX"?: string
    "@_TranslateY"?: string
  }
  
  export interface PnpSections2 {
    "pnp:Section": any
  }
  
  export interface PnpHeader3 {
    "@_Layout": string
    "@_MenuStyle": string
    "@_BackgroundEmphasis": string
    "@_ShowSiteTitle": string
    "@_ShowSiteNavigation": string
  }
  
  export interface PnpFooter {
    "pnp:FooterLinks": PnpFooterLinks
    "@_Enabled": string
    "@_Logo": string
    "@_RemoveExistingNodes": string
    "@_Layout": string
    "@_BackgroundEmphasis": string
  }
  
  export interface PnpFooterLinks {
    "pnp:FooterLink": PnpFooterLink[]
  }
  
  export interface PnpFooterLink {
    "pnp:FooterLink": PnpFooterLink2[]
    "@_DisplayName": string
    "@_Url": string
  }
  
  export interface PnpFooterLink2 {
    "@_DisplayName": string
    "@_Url": string
  }
  
export async function getTemplate(){
    
    const fsPath = "/Users/nielsgregersjohansen/code/koksmat/koksmat-cli/powershell/scripts/sharepoint"
    const templateName = "allpages-template.xml"
    const xmlFile =  path.join(fsPath, templateName)
    const options = {
        ignoreAttributes: false,
        attributeNamePrefix : "@_"
    };
    const parser = new XMLParser(options)
    const XMLdata = fs.readFileSync(xmlFile, "utf8")
    let jObj = parser.parse(XMLdata);
    const xml = jObj as any as PnpTemplateFile
    
    let files = []
    let pages = []
    if (xml)

    files = xml["pnp:Provisioning"]["pnp:Templates"]["pnp:ProvisioningTemplate"]["pnp:Files"]["pnp:File"].filter(file=>{
       return  !fs.existsSync(path.join(fsPath,file["@_Src"]))
    }).map((file: any) => {
        return file
     })

     pages = xml["pnp:Provisioning"]["pnp:Templates"]["pnp:ProvisioningTemplate"]["pnp:ClientSidePages"]["pnp:ClientSidePage"].filter(page=>page["@_LCID"]!=="1033") .map((page) => {
      
       return{LCID: page["@_LCID"] ?? "????"   ,pageName: page["@_PageName"]}
    })
     return pages

}