"use client"

import * as React from "react"
import { useContext, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { https } from "@/lib/httphelper"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  SitePage,
  getSiteCollection,
  getSitePages,
} from "../profile/data/officegraph"
import { Me } from "../profile/data/schemas"
import { SharePointExtensionContext } from "./usecasecontext"
import { copyPage } from "./actions/pages"
import { setConfig } from "next/config"
import { CopyIcon,EditIcon, PenToolIcon } from "lucide-react"

export interface LegacyPageContext {
  ListCountLimit: number
  FieldCountLimit: number
  ClientPrefetchBehavior: number
  IsConsumerListsPaidUser: boolean
  IsConsumerFilesPaidUser: boolean
  IsConsumerPremiumUser: any
  siteDisabled: boolean
  webServerRelativeUrl: string
  webAbsoluteUrl: string
  viewId: string
  webPropertyFlags2: number
  listId: string
  listTemplateId: string
  listPermsMask: ListPermsMask
  listUrl: string
  listTitle: string
  listBaseTemplate: number
  listBaseType: number
  listForceCheckout: boolean
  ariaCollectorUrl: string
  secureBrokerDomainName: string
  oneDsCollectorUrl: string
  driveInfo: DriveInfo
  vanityUrls: VanityUrls
  multiGeoInfo: MultiGeoInfo[]
  viewOnlyExperienceEnabled: boolean
  m365GroupsBlockDownloadsExperienceEnabled: boolean
  readOnlyExperienceEnabled: boolean
  blockDownloadFileTypePolicyEnabled: boolean
  authContextLimitedAccessExperienceEnabled: boolean
  disableBackToClassic: boolean
  isOAuth: boolean
  isLocationserviceAvailable: boolean
  blockDownloadsExperienceEnabled: boolean
  idleSessionSignOutEnabled: boolean
  activityBasedTimeoutEnabled: boolean
  isFraudTenant: boolean
  fraudTenantAccessRevokeTime: string
  cdnPrefix: string
  cdnBaseUrl: any
  siteAbsoluteUrl: string
  siteId: string
  showNGSCDialogForSyncOnTS: boolean
  supportPoundStorePath: boolean
  supportPercentStorePath: boolean
  siteSubscriptionId: string
  tenantDisplayName: string
  isMultiGeoTenant: boolean
  isMultiGeoODBMode: boolean
  webDomain: string
  isSPO: boolean
  appSeatsQuota: number
  isSelfServiceSiteCreationEnabled: boolean
  farmLabel: string
  farmName: string
  contentDBName: string
  serverRequestPath: string
  layoutsUrl: string
  webId: string
  webTitle: string
  WebTitleCurrentLCID: number
  webTemplate: string
  webTemplateConfiguration: string
  webDescription: string
  WebDescriptionCurrentLCID: number
  tenantAppVersion: string
  isAppWeb: boolean
  webLogoUrl: string
  webLanguage: number
  webLanguageName: string
  currentLanguage: number
  currentUICultureName: string
  currentCultureName: string
  currentCultureLCID: number
  env: string
  env2: string
  cloudType: string
  nid: number
  fid: number
  serverTime: string
  siteClientTag: string
  crossDomainPhotosEnabled: boolean
  openInClient: boolean
  webUIVersion: number
  webPermMasks: WebPermMasks
  pageListId: string
  pageItemId: number
  pagePermsMask: PagePermsMask
  pagePersonalizationScope: number
  userEmail: string
  userId: number
  userLoginName: string
  userDisplayName: string
  isAnonymousGuestUser: boolean
  isEmailAuthenticationGuestUser: boolean
  isExternalGuestUser: boolean
  isNativeFederatedUser: boolean
  homeTenantId: any
  requestFilesLinkEnabled: boolean
  isShareByLinkEnabled: boolean
  syntexStreamOptions: number
  FolderAnonymousLinkPermission: number
  systemUserKey: string
  alertsEnabled: boolean
  siteServerRelativeUrl: string
  allowSilverlightPrompt: string
  themeCacheToken: string
  themedCssFolderUrl: string
  themedImageFileNames: ThemedImageFileNames
  modernThemingEnabled: boolean
  isSiteAdmin: boolean
  isMySiteOwner: boolean
  isSiteOwner: boolean
  isSiteListsHost: boolean
  viewType: string
  ExpFeatures: number[]
  experimentData: string
  experimentDataLookup: any[]
  killSwitches: any
  CorrelationId: string
  hasManageWebPermissions: boolean
  isNoScriptEnabled: boolean
  groupId: any
  relatedGroupId: any
  isTeamsConnectedSite: boolean
  isTeamsChannelSite: boolean
  teamsChannelType: number
  channelGroupId: string
  groupHasHomepage: boolean
  groupHasQuickLaunchConversationsLink: boolean
  ListsShowHeaderAndNavigation: boolean
  departmentId: string
  hubSiteId: string
  sensitivityLabel: string
  sensitivityLabelName: string
  restrictedToRegion: any
  hasPendingWebTemplateExtension: boolean
  HasCortexTopicExperiencesCapability: boolean
  disableRecommendedItems: boolean
  isGroupRelatedSite: boolean
  isArchived: boolean
  IBSegments: any
  IBMode: number
  spAppBarManifestScript: string
  spAppBarBackupManifestScript: string
  spAppBarManifestScriptIntegrity: string
  portalUrl: string
  hasAutogeneratedWebLogo: boolean
  canSyncHubSitePermissions: boolean
  isHubSite: boolean
  isWebWelcomePage: boolean
  siteClassification: string
  hideSyncButtonOnODB: boolean
  isEduClass: boolean
  isEduClassProvisionPending: boolean
  isEduClassProvisionChecked: boolean
  isEduTenant: boolean
  showNGSCDialogForSyncOnODB: boolean
  sitePagesEnabled: boolean
  sitePagesFeatureVersion: number
  showOpenInDesktopOptionForSyncedFiles: boolean
  featureInfo: FeatureInfo
  DesignPackageId: string
  groupType: any
  groupColor: any
  siteColor: any
  headerEmphasis: number
  headerLayout: number
  logoAlignment: number
  focalPoint: any
  headerLogoHash: any
  globalNavLogoHash: string
  isGlobalNavEnabled: boolean
  searchScope: number
  homeSiteNavConfigs: HomeSiteNavConfigs
  searchBoxInNavBar: number
  searchBoxPlaceholderText: any
  IsClassicPageSearchUpgraded: boolean
  WebTemplatesGalleryFirstRunEnabled: boolean
  hasWebTemplateExtension: boolean
  navigationInfo: NavigationInfo
  appBarParams: AppBarParams
  clientPersistedCacheKey: ClientPersistedCacheKey
  guestsEnabled: boolean
  MenuData: MenuData
  RecycleBinItemCount: number
  listItemCount: number
  PublishingFeatureOn: boolean
  PreviewFeaturesEnabled: boolean
  disableAppViews: boolean
  disableFlows: boolean
  serverRedirectedUrl: any
  formDigestValue: string
  IsHomepageModernized: boolean
  NextStepsFirstRunEnabled: boolean
  maximumFileSize: number
  formDigestTimeoutSeconds: number
  canUserCreateMicrosoftForm: boolean
  canUserCreateVisioDrawing: boolean
  canUserCreateDocumentTypes: number
  isFLWUser: boolean
  canUserUseSyntex: boolean
  canUserUseClipchamp: boolean
  isSyntexEnabled: boolean
  isUserSyntexV2Licensed: boolean
  isTenantSyntexV2Licensed: boolean
  isSyntexExperienceEnabled: boolean
  isSyntexPAYGEnabled: boolean
  isSyntexEnhancedImageTaggingEnabled: boolean
  syntexPAYGEnabledFeaturesInfo: SyntexPaygenabledFeaturesInfo
  isSyntexESignatureEnabled: boolean
  isSyntexPrebuiltEnabled: boolean
  isSyntexDocumentUnderstandingEnabled: boolean
  isSyntexTaxonomyTaggingEnabled: boolean
  isSyntexAIBuilderEnabled: boolean
  syntexAIBuilderEnvironment: string
  readOnlyState: any
  resourceQuotaExceeded: number
  preferUserTimeZone: boolean
  userTimeZoneData: any
  CalendarType: number
  userTime24: boolean
  userFirstDayOfWeek: any
  webTimeZoneData: WebTimeZoneData
  webTime24: boolean
  webFirstDayOfWeek: number
  aadTenantId: string
  aadUserId: string
  aadInstanceUrl: string
  aadSessionId: string
  msGraphEndpointUrl: string
  substrateEndpointUrl: string
  msMruEndpointUrl: string
  allowInfectedDownload: boolean
  organizationNewsSiteReference: any[]
  companyPortalReference: any
  isCurrentSiteAHomeSite: boolean
  isCurrentSiteAVivaBackendSite: boolean
  isHomeSiteEnabled: boolean
  knowledgeHubSiteDetails: any
  spfx3rdPartyServicePrincipalId: string
  spfx3rdPartyCustomServicePrincipalId: any
  spfx3rdPartyCustomServicePrincipalAppUri: any
  hasSpfx3rdPartyCustomPrincipal: boolean
  completenessUrls: any
  socialBarEnabled: boolean
  substrateOneDriveDisabled: boolean
  isGroupifyDisabled: boolean
  isSearchQueryServedBySubstrate: boolean
  isGroupifyMenuButtonFeatureOff: boolean
  Has2019Era: boolean
  userVoiceForFeedbackEnabled: boolean
  substrateOneDriveMigrated: boolean
  userPrincipalName: string
  AddToOneDriveDisabled: boolean
  spfxOBOFlowEnabled: boolean
  publicCdnBaseUrl: string
  userPhotoCdnBaseUrl: string
  MediaTAServiceHostUrl: string
  SideBySideToken: string
  enforceIBSegmentFilter: boolean
  disablePersonalListCreation: boolean
  CommentsOnFilesDisabled: boolean
  CommentsOnListItemsDisabled: boolean
  ViewersCanCommentOnMediaDisabled: boolean
  DisableSpacesActivation: boolean
  HideSyncButtonOnDocLib: boolean
  IsAllowNullContext: boolean
  IsMsalTokenProviderPopupEnabled: boolean
  ShouldFallbackToItemsScope: boolean
  farmSettings: FarmSettings
  OfficeMediaFlightingConfiguration: OfficeMediaFlightingConfiguration
  PageParentsCommentsDisabled: boolean
  HasSiteUsersExpiringSoon: boolean
  CurrentUserExpiration: any
  listIsDefaultDocumentLibrary: boolean
  listPageSchedulingEnabled: boolean
  listPageMultilingualEnabled: boolean
  SiteAuthContext: string
  viewInFileExplorer: boolean
  relatedHubSiteIds: string
  isLabelIRMEnabled: boolean
  LabelIrmSupportedExtensions: string[]
  isDocumentLibraryDefaultLabellingEnabled: boolean
}

export interface ListPermsMask {
  High: number
  Low: number
}

export interface DriveInfo {}

export interface VanityUrls {}

export interface MultiGeoInfo {
  InstanceId: string
  DataLocation: any
  IsDefaultDataLocation: boolean
  RootSiteUrl: string
  MySiteHostUrl: string
  TenantAdminUrl: string
  PortalUrl: string
  AdditionalUrls: any
}

export interface WebPermMasks {
  High: number
  Low: number
}

export interface PagePermsMask {
  High: number
  Low: number
}

export interface ThemedImageFileNames {
  "spcommon.png": string
  "ellipsis.11x11x32.png": string
  "O365BrandSuite.95x30x32.png": string
  "socialcommon.png": string
  "spnav.png": string
}


export interface FeatureInfo {
  SitePages: SitePages
  SitePagesResources: SitePagesResources
  RecommendedItems: RecommendedItems
  MultilingualPages: MultilingualPages
  MultilingualResources: MultilingualResources
  Viewers: Viewers
  SitePagePublishing: SitePagePublishing
  SitePagesScheduling: SitePagesScheduling
  SitePagesSchedulingResources: SitePagesSchedulingResources
  ModernAudienceTargeting: ModernAudienceTargeting
  FeedVideo: FeedVideo
  FeedVideoResources: FeedVideoResources
  Publishing: Publishing
  FollowingContent: FollowingContent
  CategoriesPages: CategoriesPages
  ContentCenterFeature: ContentCenterFeature
  ContentCenterEverywhereFeature: ContentCenterEverywhereFeature
  MixedReality: MixedReality
  MixedRealityResources: MixedRealityResources
  EEDashboard: Eedashboard
  VivaBackendFeature: VivaBackendFeature
}

export interface SitePages {
  Version: number
  Enabled: boolean
}

export interface SitePagesResources {
  Version: number
  Enabled: boolean
}

export interface RecommendedItems {
  Version: number
  Enabled: boolean
}

export interface MultilingualPages {
  Version: number
  Enabled: boolean
}

export interface MultilingualResources {
  Version: number
  Enabled: boolean
}

export interface Viewers {
  Version: number
  Enabled: boolean
}

export interface SitePagePublishing {
  Version: number
  Enabled: boolean
}

export interface SitePagesScheduling {
  Version: number
  Enabled: boolean
}

export interface SitePagesSchedulingResources {
  Version: number
  Enabled: boolean
}

export interface ModernAudienceTargeting {
  Version: number
  Enabled: boolean
}

export interface FeedVideo {
  Version: number
  Enabled: boolean
}

export interface FeedVideoResources {
  Version: number
  Enabled: boolean
}

export interface Publishing {
  Version: number
  Enabled: boolean
}

export interface FollowingContent {
  Version: number
  Enabled: boolean
}

export interface CategoriesPages {
  Version: number
  Enabled: boolean
}

export interface ContentCenterFeature {
  Version: number
  Enabled: boolean
}

export interface ContentCenterEverywhereFeature {
  Version: number
  Enabled: boolean
}

export interface MixedReality {
  Version: number
  Enabled: boolean
}

export interface MixedRealityResources {
  Version: number
  Enabled: boolean
}

export interface Eedashboard {
  Version: number
  Enabled: boolean
}

export interface VivaBackendFeature {
  Version: number
  Enabled: boolean
}

export interface HomeSiteNavConfigs {}

export interface NavigationInfo {
  isAudienceTargeted: boolean
  quickLaunch: QuickLaunch[]
  topNav: any[]
}

export interface QuickLaunch {
  Id: number
  Title: string
  Url: string
  IsDocLib: boolean
  IsExternal: boolean
  ParentId: number
  ListTemplateType: number
  AudienceIds: any
  CurrentLCID: number
  Children: Children[]
  OpenInNewWindow?: boolean
}

export interface Children {
  Id: number
  Title: string
  Url: string
  IsDocLib: boolean
  IsExternal: boolean
  ParentId: number
  ListTemplateType: number
  AudienceIds: any
  CurrentLCID: number
  Children: Children2[]
  OpenInNewWindow?: boolean
}

export interface Children2 {
  Id: number
  Title: string
  Url: string
  IsDocLib: boolean
  IsExternal: boolean
  ParentId: number
  ListTemplateType: number
  AudienceIds: any
  CurrentLCID: number
  Children: any[]
  OpenInNewWindow: boolean
}

export interface AppBarParams {
  isDisabled: boolean
  portalUrl: string
  mySiteHostUrl: any
  logoHash: string
  homeSiteNavConfigs: HomeSiteNavConfigs2
  correlationID: string
  companyPortalReference: any
  isCurrentSiteAHomeSite: boolean
  isHomeSiteEnabled: boolean
  router: boolean
  isGlobalNavEnabled: boolean
  strings: Strings
}

export interface HomeSiteNavConfigs2 {}

export interface Strings {
  name: string
  nav: string
  home: string
  sites: string
  news: string
  files: string
  close: string
  create: string
  lists: string
}

export interface ClientPersistedCacheKey {
  CurrentKey: CurrentKey
  PreviousKey: PreviousKey
}

export interface CurrentKey {
  Key: string
  Date: string
}

export interface PreviousKey {
  Key: string
  Date: string
}

export interface MenuData {
  SettingsData: SettingsDaum | undefined[]
  SignOutUrl: string
}

export interface SettingsDaum {
  Id: string
  Text: string
  Url: string
}

export interface SyntexPaygenabledFeaturesInfo {
  ContentAssemblyEnabled: boolean
}

export interface WebTimeZoneData {
  Description: string
  Bias: number
  Id: number
  DaylightBias: number
  DaylightDate: DaylightDate
  StandardBias: number
  StandardDate: StandardDate
  WorkHours: WorkHours
}

export interface DaylightDate {
  Year: number
  Month: number
  DayOfWeek: number
  Day: number
  Hour: number
  Minute: number
  Second: number
  Milliseconds: number
}

export interface StandardDate {
  Year: number
  Month: number
  DayOfWeek: number
  Day: number
  Hour: number
  Minute: number
  Second: number
  Milliseconds: number
}

export interface WorkHours {
  WorkDayStartHour: number
  WorkDayEndHour: number
  WorkDays: number
}

export interface FarmSettings {
  ExternalService_powerappscreatehostname: string
  ExternalService_flowhostname: string
  ExternalService_flowservicehostname: string
  ExternalService_popularplatformsenable: string
  ExternalService_filerequestenable: string
  ExternalService_primaryfileingest: string
  ExternalService_workingset: string
  ExternalService_yggdrasil: string
  ExternalService_isplannerintegrationsupported: string
  ExternalService_islivepersonacardenabled: string
  ExternalService_powerappsappshostname: string
  ExternalService_powerappsmakehostname: string
  ExternalService_bizappsapprovalflowsenabled: string
  ExternalService_bizappsflowenabled: string
  ExternalService_bizappshubsitejoinapprovalenabled: string
  ExternalService_bizappspowerappsenabled: string
  ExternalService_bizappsremindmeflowenabled: string
  ExternalService_bizappsrequestsignoffenabled: string
  ExternalService_isnotificationservicesupported: string
  ExternalService_modernsiteanalyticsenable: string
  ExternalService_pagecontentapprovalenabled: string
  ExternalService_videousecdnenabled: string
  ExternalService_powerbihostname: string
  ExternalService_isstreamwebpartsupported: string
  ExternalService_excelgraphenabled: string
  ExternalService_powerbiapibaseurl: string
  ExternalService_searchcloudenvironment: string
  ExternalService_isodbsubstratesearchenabled: string
  ExternalService_isitemscopefilecardenabled: string
  ExternalService_isstockimagesupported: string
  ExternalService_issphomemicroservicesupported: string
  ExternalService_searchcloudurl: string
  ExternalService_vivaconnectionsenabled: string
  ExternalService_yourphoneapiendpoint: string
  ExternalService_yourphonehvcendpoint: string
  ExternalService_augloopeditorserviceenabled: string
  ExternalService_phonelinkapiendpoint: string
  ExternalService_phonelinkhvcendpoint: string
  ExternalService_phonelinkcdnendpoint: string
  ExternalService_powerbiapiresourceuri: string
  ExternalService_listrulesenabled: string
  ExternalService_teamsendpoint: string
  ExternalService_whiteboardopenurl: string
  ExternalService_isunstructureddocprocessingsupported: string
  ExternalService_powerautomatemakehostname: string
  ExternalService_issyntexprebuiltmodelssupported: string
  ExternalService_phonelinkhvcv2endpoint: string
  ExternalService_swahomepageurl: string
  ExternalService_swasharelinkroutingenabled: string
  ExternalService_teamsapprovalsenabled: string
}

export interface OfficeMediaFlightingConfiguration {
  Cloud: string
  ClientToServiceEndpoint: string
  ClientRolloutEnvironment: string
}


export default function RootPage() {
  const context = useContext(SharePointExtensionContext)
  const searchParams = useSearchParams()
  const [token, settoken] = useState(
    searchParams ? searchParams.get("token") : ""
  )
  const [parentLocation, setparentLocation] = useState(
    searchParams ? searchParams.get("href") : ""
  )
  const [me, setMe] = useState<Me>()
  const [sitePath, setsitePath] = useState("")
  const [sharePointTenantName, setsharePointTenantName] = useState("")
  const [siteId, setsiteId] = useState("")
  const [sitePages, setsitePages] = useState<SitePage[]>([])
  const [resolveduser, setresolveduser] = useState()
  const [sourceUrl, setsourceUrl] = useState("")
  const [copying, setcopying] = useState(false)
  const [newPageUrl, setnewPageUrl] = useState("")
  const [errorMessage, seterrorMessage] = useState("")
  const [legacyPageContext, setlegacyPageContext] = useState<LegacyPageContext>()
  React.useEffect(() => {
    const load = async () => {
      const res = await https<Me>(
        token ?? "",
        "GET",
        "https://graph.microsoft.com/v1.0/me"
      )
      if (!res.hasError) {
        setMe(res.data)
      }
    }
    if (token) {
      context.settoken(token)
      context.setparentlocation(parentLocation?.split("?")[0] ?? "")
      load()
    }
  }, [token, parentLocation])

  React.useEffect(() => {
    const load = async () => {
      const res = await getSiteCollection(
        token || "",
        sharePointTenantName,
        sitePath
      )

      if (!res.hasError) {
        setsiteId(res.data?.id ?? "")
      }
    }
    if (token && sharePointTenantName && sitePath) {
      load()
    }
  }, [sharePointTenantName, sitePath, token])

  React.useEffect(() => {
    // https://christianiabpos.sharepoint.com/sites/nexiintra-home?debug=true
    if (parentLocation) {
      const s = parentLocation.split(".sharepoint.com/")
      if (s.length > 1) {
        const tenant = s[0].replace("https://", "")
        const site = s[1].split("?")[0]
        setsitePath(site)
        setsharePointTenantName(tenant)
      }
    }
  }, [parentLocation])

  // This hook is listening an event that came from the Iframe
  React.useEffect(() => {
    type MessageTypes = "ensureuser" | "closemagicbox" | "resolveduser" | "context"
    interface Message {
      type: MessageTypes
      messageId: string
      str1: string
    }
    const handler = async (
      ev: MessageEvent<{ type: MessageTypes; data: any }>
    ) => {
      console.log("ev", ev)

      // if (typeof ev.data !== 'object') return
      // if (!ev.data.type) return
      // if (ev.data.type !== 'button-click') return

      let r
      try {
        const m = ev.data
        switch (m.type) {
          case "resolveduser":
            setresolveduser(m.data?.LoginName)
            break
            
            case "context":
              
              const context = JSON.parse(m.data)
              setlegacyPageContext(context)
              break
              

            

          default:
            break
        }
        //setmessage(ev.data.message)
      } catch (error) {
        console.log("ERROR", error)
      }
    }

    window.addEventListener("message", handler)

    window.parent.postMessage(
      {
        type: "context",
        data: "",
      },
      "*"
    )
    // Don't forget to remove addEventListener
    return () => window.removeEventListener("message", handler)
  }, [])
  React.useEffect(() => {
    const load = async () => {
      const res = await getSitePages(token || "", siteId)

      if (!res.hasError && res.data) {
        setsitePages(res.data)
      }
    }
    if (siteId) {
      load()
    }
  }, [siteId])

  const onCopyPage = async () => {
    setcopying(true)
    const destSiteUrl = context.parentlocation.split("/SitePages")[0]
    const copyPageResult = await copyPage(sourceUrl,destSiteUrl)
    setcopying(false)
    if (copyPageResult.hasError) {
      seterrorMessage(copyPageResult.errorMessage ?? "Unknown error")
      return
    }
    setnewPageUrl(copyPageResult.data?.newpageurl ?? "")

  }

  return (
    <div className="h-screen w-screen">
      <div className="flex h-screen flex-row">
        <div className="flex-grow bg-transparent blur-md"></div>
        <div className="w-[500px] bg-gray-200 transition-transform delay-150 ease-in-out">
          <div className="m-4 overflow-scroll ">
            <div className="p-3"></div>
      
            <div className="p-3">
              <Button
                variant="default"
                onClick={() => {
                  window.parent.postMessage(
                    {
                      type: "closemagicbox",
                      data: "",
                    },
                    "*"
                  )
                }}
              >
                Restore Standard SharePoint navigation
              </Button>
            </div>
            <div className="p-3">
              <Button variant="default">
                <Link href={`/magicbox/sitepages${legacyPageContext?.siteServerRelativeUrl}`}>Pages</Link>
              </Button>
            </div>
            <div className="p-3">
              <Button variant="default">
                <Link href={`/magicbox/usecase/search`}>Search</Link>
              </Button>
            </div>
            {legacyPageContext && legacyPageContext.isSiteOwner && 
            <div>
              <div>
Site owner options

              </div>
              {/* <div className="p-3">
              <Button variant="link"  className=""
                onClick={() => {
                  const newUrl = legacyPageContext.multiGeoInfo[0]?.RootSiteUrl + legacyPageContext.serverRequestPath.substring(1) + "?mode=edit"
                  window.parent.postMessage(
                    {
                      type: "closemagicbox",
                      data: "",
                    },
                    "*"
                  )
                  window.open(newUrl, "_blank")
                }}
              >
                <PenToolIcon/>&nbsp;Edit
              </Button>
            </div> */}
            <div className="p-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link"  className="">
                    <CopyIcon/>&nbsp;
                    Copy Page
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Copy Page</DialogTitle>
                    <DialogDescription>
                   Find the URL of the page that you like to have a copy of.
                  </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 ">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Source URL 
                      </Label>
                      <Input
                        value={sourceUrl}
                        onChange={(e) => {
                          setsourceUrl(e.target.value)
                        }}
                        id="name"
                        className="col-span-3"
                      />
                    </div>
                   
                  </div>
                  <DialogFooter>
                    {copying && <div>Copying... Expect 5-15 seconds delay</div>}
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    {newPageUrl && <div>
                    <Button type="button" ><Link href={newPageUrl} target="_blank">Open new page</Link> </Button>
                    </div>}
                    {!copying && !newPageUrl && 
                    <Button type="button" disabled={sourceUrl===""} onClick={()=>onCopyPage()}>Copy</Button>}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              </div>
              <div className="hidden p-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link"  className="">
                    <CopyIcon/>&nbsp;
                    Copy Library
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Copy Page</DialogTitle>
                    <DialogDescription>
                   Find the URL of the page that you like to have a copy of.
                  </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 ">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Source URL 
                      </Label>
                      <Input
                        value={sourceUrl}
                        onChange={(e) => {
                          setsourceUrl(e.target.value)
                        }}
                        id="name"
                        className="col-span-3"
                      />
                    </div>
                   
                  </div>
                  <DialogFooter>
                    {copying && <div>Copying... Expect 5-15 seconds delay</div>}
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    {newPageUrl && <div>
                    <Button type="button" ><Link href={newPageUrl} target="_blank">Open new page</Link> </Button>
                    </div>}
                    {!copying && !newPageUrl && 
                    <Button type="button" disabled={sourceUrl===""} onClick={()=>onCopyPage()}>Copy</Button>}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              </div>
              <div className="hidden p-3">
<Link href="https://clarity.microsoft.com/projects/view/iwgs4fzf64/dashboard?date=Last%203%20days" target="_blank">
<Button>
  Insights
</Button>
</Link>

              </div>
            </div>
            
            
            
            }

          
          </div>{" "}
        </div>
      </div>
    </div>
  )
}
