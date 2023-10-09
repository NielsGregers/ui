"use client"

import * as React from "react"
import { useContext, useState } from "react"
import { useSearchParams } from "next/navigation"

import { https } from "@/lib/httphelper"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Root,
  SitePage,
  getSiteCollection,
  getSitePages,
} from "../../../../profile/data/officegraph"
import { Me } from "../../../../profile/data/schemas"
import { SitepageCard } from "../../../../magicbox/components/pagecard"
import { SharePointExtensionContext } from "../../../../magicbox/usecasecontext"

export interface WebParts {
  "@odata.context": string
  value: Value[]
}

export interface Value {
  "@odata.type": string
  id: string
  webPartType?: string
  data?: Data
  innerHtml?: string
}

export interface Data {
  audiences: any[]
  dataVersion: string
  description: string
  title: string
  properties: Properties
  serverProcessedContent: ServerProcessedContent
}

export interface Properties {
  description?: string
  queryparameter?: string
  listname?: string
  fieldname?: string
  urlfield?: string
  height?: string
  showChrome?: boolean
  layoutId?: string
  newsDataSourceProp?: number
  carouselHeroWrapperComponentId?: string
  prefetchCount?: number
  dataProviderId?: string
  renderItemsSliderValue?: number
  layoutComponentId?: string
  webId?: string
  siteId?: string
  "pinnedItems@odata.type"?: string
  pinnedItems?: any[]
  filterKQLQuery?: string
  audienceTargetingEnabled?: boolean
  "filters@odata.type"?: string
  filters?: Filter[]
  showNewsMetadata?: ShowNewsMetadata
  "sites@odata.type"?: string
  sites?: Site[]
  carouselSettings?: CarouselSettings
  "newsSiteList@odata.type"?: string
  newsSiteList?: NewsSiteList[]
  heroLayoutThreshold?: number
  carouselLayoutMaxWidth?: number
  isFullWidth?: boolean
  layoutCategory?: number
  layout?: number
  "content@odata.type"?: string
  content?: Content[]
  script?: string
  title?: string
  removePadding?: boolean
  spPageContextInfo?: boolean
  scriptCode?: string
  tabs?: string
}

export interface Filter {
  filterType: number
  value: string
  "values@odata.type": string
  values: any[]
}

export interface ShowNewsMetadata {
  "@odata.type": string
  showSocialActions: boolean
  showAuthor: boolean
  showDate: boolean
}

export interface Site {
  Acronym: string
  Title: string
  BannerColor: string
  Url: string
  Type: string
  DepartmentId: string
  ItemReference: ItemReference
}

export interface ItemReference {
  "@odata.type": string
  WebId: string
  "IndexId@odata.type": string
  IndexId: number
  SiteId: string
  Type: string
}

export interface CarouselSettings {
  "@odata.type": string
  autoplay: boolean
  autoplaySpeed: number
  dots: boolean
  lazyLoad: boolean
  metadata: boolean
  swipe: boolean
  useStockItems: boolean
}

export interface NewsSiteList {
  Acronym: string
  Title: string
  BannerColor: string
  Url: string
  Type: string
  DepartmentId: string
  ItemReference: ItemReference2
}

export interface ItemReference2 {
  "@odata.type": string
  WebId: string
  "IndexId@odata.type": string
  IndexId: number
  SiteId: string
  Type: string
}

export interface Content {
  id: string
  type: string
  color: number
  description: string
  showDescription: boolean
  showTitle: boolean
  alternateText: string
  imageDisplayOption: number
  isDefaultImage: boolean
  showCallToAction: boolean
  isDefaultImageLoaded: boolean
  isCustomImageLoaded: boolean
  showFeatureText: boolean
  previewImage: PreviewImage
  image?: Image
}

export interface PreviewImage {
  "@odata.type": string
  zoomRatio: number
  siteId: string
  webId: string
  listId: string
  id: string
  resolvedUrl: string
  imageUrl: string
  widthFactor: number
  minCanvasWidth: number
}

export interface Image {
  "@odata.type": string
  zoomRatio: number
  siteId: string
  webId: string
  listId: string
  id: string
  resolvedUrl: string
  imageUrl: string
  widthFactor: number
  minCanvasWidth: number
}

export interface ServerProcessedContent {
  htmlStrings: any[]
  searchablePlainTexts: SearchablePlainText[]
  links: Link[]
  imageSources: ImageSource[]
  componentDependencies?: ComponentDependency[]
  customMetadata?: CustomMetadaum[]
}

export interface SearchablePlainText {
  key: string
  value: string
}

export interface Link {
  key: string
  value: string
}

export interface ImageSource {
  key: string
  value: string
}

export interface ComponentDependency {
  key: string
  value: string
}

export interface CustomMetadaum {
  key: string
  value: Value2
}

export interface Value2 {
  siteid: string
  webid: string
  listid: string
  uniqueid: string
  renderwidthratio: string
  renderwidthratiothreshold: string
  mincanvaswidth: string
}

export default function RootPage({ params }: { params: { sitename: string } }) {
  const context = useContext(SharePointExtensionContext)
  const searchParams = useSearchParams()
  const { sitename } = params

  const [sitePath, setsitePath] = useState("")
  const [sharePointTenantName, setsharePointTenantName] = useState("")
  const [siteId, setsiteId] = useState("")
  const [sitePages, setsitePages] = useState<SitePage[]>([])
  const [pageDetails, setpageDetails] = useState<WebParts>()

  const [showSidepanel, setshowSidepanel] = useState(false)
  const showDetails = async (page: SitePage) => {
    const url = `https://graph.microsoft.com/beta/sites/${page.parentReference.siteId}/pages/${page.id}/microsoft.graph.sitepage/webparts`
    const data = await https<WebParts>(context.token ?? "", "GET", url)
    setpageDetails(data.data)
    setshowSidepanel(true)
  }
  React.useEffect(() => {
    const load = async () => {
      const res = await getSiteCollection(
        context.token,
        sharePointTenantName,
        "sites/" + sitename
      )

      if (!res.hasError) {
        setsiteId(res.data?.id ?? "")
      }
    }
    if (context.token && sharePointTenantName && sitePath) {
      load()
    }
  }, [sharePointTenantName, sitePath, context.token])

  React.useEffect(() => {
    // https://christianiabpos.sharepoint.com/sites/nexiintra-home?debug=true
    if (context.parentlocation) {
      const s = context.parentlocation.split(".sharepoint.com/")
      if (s.length > 1) {
        const tenant = s[0].replace("https://", "")
        const site = s[1].split("?")[0]
        setsitePath(site)

        setsharePointTenantName(tenant)
      }
    }
  }, [context.parentlocation])

  React.useEffect(() => {
    const load = async () => {
      const res = await getSitePages(context.token, siteId)

      if (!res.hasError && res.data) {
        setsitePages(res.data)
      }
    }
    if (siteId) {
      load()
    }
  }, [siteId])

  return (
    <div className="minh-screen w-screen  bg-white">
      <div className="container">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Pages
        </h3>
        <div className="grow  bg-white">
          <div className="m-8 flex flex-wrap">
            {sitePages
              .sort((a, b) => {
                return (a.name ?? "").localeCompare(b.name)
              })
              .map((page) => (
                <SitepageCard
                  key={page.id}
                  page={page}
                  className="m-3 w-[250px] bg-white"
                  aspectRatio="portrait"
                  width={250}
                  height={330}
                  siteUrl={
                    context.parentlocation.split("/sites/")[0] +
                    "/sites/" +
                    sitename
                  }
                  showDetails={showDetails}
                />
              ))}
          </div>
        </div>
        <Sheet open={showSidepanel} onOpenChange={setshowSidepanel}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you are done.
              </SheetDescription>
            </SheetHeader>
            <div >
              {pageDetails?.value.map((part) => (
                <div key={part.id} className="bg-white p-4">
                  <Label>{part.data?.title}</Label>
                </div>
              ))}

              <textarea value={JSON.stringify(pageDetails, null, 2)}></textarea>
            </div>
          </SheetContent>
        </Sheet>
        <pre></pre>
      </div>
    </div>
  )
}
