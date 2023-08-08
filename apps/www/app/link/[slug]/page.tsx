import { siteConfig } from "@/app/news/config/site";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getToken, getRootSite, getSubSite, getListItem, getSharePointPage } from "@/lib/officegraph"
import { Links } from "@/services/sharepoint/nexiintra-home/sharepoint"
import { z } from "zod"
import { de } from "date-fns/locale";
import { getUserSession } from "@/lib/user"
import { AnyRender } from "@tanstack/react-table";
//import { Country, Unit } from "./schema"


async function getPage(slug: string) {
  const token = await getToken(process.env.SPAUTH_TENANTID as string, process.env.SPAUTH_CLIENTID as string, process.env.SPAUTH_CLIENTSECRET as string)
  const rootSiteResponse = await getRootSite(token)
  const subSiteResponse = await getSubSite(token, rootSiteResponse.data?.siteCollection.hostname as string, "sites/nexiintra-home")

  const { data, hasError, errorMessage } = await getListItem(token, subSiteResponse.data?.id as string, Links.listName, "Slug", slug);
  if (hasError) {
    console.log(errorMessage);
  }
  const sharePointPage = await getSharePointPage(token,subSiteResponse.data?.id as string,1)

  let metadataPage
  if (data?.value && data?.value.length > 0) {
    metadataPage = Links.map(data?.value[0]);
  }

  return {metadataPage,sharePointPage}

  

}
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {


  
    const {metadataPage,sharePointPage} = await getPage(params.slug)


  return {
    title: {
      default: metadataPage?.Title,
      template: `%s - ${metadataPage?.Description}`,
    },
    description: metadataPage?.Description,
    // keywords: [
    //   "Next.js",
    //   "React",
    //   "Tailwind CSS",
    //   "Server Components",
    //   "Radix UI",
    // ],
    authors: [
      {
        name: metadataPage?.CreatedBy,
       // url: page?.CreatedBy,
      },
    ],
    creator: metadataPage?.CreatedBy,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: metadataPage?.URL,
      title: metadataPage?.Title,
      description: metadataPage?.Description,
      siteName: "Nexi Group Intranet",
      images: [
        {
          url: metadataPage?.Image,
          width: 1200,
          height: 630,
          alt: metadataPage?.Title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataPage?.Title,
      description: metadataPage?.Description,
      images: [metadataPage?.Image],
      creator: metadataPage?.CreatedBy,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  }

}


export default async function Page(p:AnyRender) { //{ params, searchParams }: Props) {
  const session = await getUserSession()
  if (!session) {
    return <div><div>Not signed in</div>
    
    Parameters
    <pre>
      {JSON.stringify(p, null, 2)}
    </pre>
    </div>
  }else{
    return <div><div>Signed in</div>
    Parameters
    <pre>
      {JSON.stringify(p, null, 2)}
    </pre>
    Session
    <pre>
      {JSON.stringify(session, null, 2)}
    </pre>
    </div>
  }
}


/**
 * <!-- HTML Meta Tags -->
<title>1H 2023 Financial Results - Nexi Group Intranet</title>
<meta name='description' content='Solid Financial Performance with 8.1% growth in revenues year-on-year and continued EBITDA margin expansion.

Sustained volume growth in all our geographies and businesses.

2023 Guidance confirmed in line with CMD medium-long term growth ambition.'>

<!-- Facebook Meta Tags -->
<meta property='og:url' content='https://christianiabpos.sharepoint.com/sites/nexi/SitePages/1H-2023-Financial-Results.aspx'>
<meta property='og:title' content='1H 2023 Financial Results - Nexi Group Intranet'>
<meta property='og:description' content='Solid Financial Performance with 8.1% growth in revenues year-on-year and continued EBITDA margin expansion.

Sustained volume growth in all our geographies and businesses.

2023 Guidance confirmed in line with CMD medium-long term growth ambition.'>
<meta property='og:image' content='https://westeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&amp;inputFormat=mp4&amp;cs=fFNQTw&amp;correlationId=c670cea0-10d5-6000-fda3-dc76f240c5e5&amp;docid=https%3A%2F%2Fchristianiabpos%2Esharepoint%2Ecom%2Fsites%2Fnexi%2F%5Fapi%2Fv2%2E0%2Fdrives%2Fb%21N%2D02FVJl%2DUWM5VgW%5F9LW0hyhlcwNz5dEm9vSvKvlL9kQOiA4mpFERJHky6xKt3bX%2Fitems%2F017Z6Y34IPLB36EGTVUBBICO75XGENDPUN%3Ftempauth%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9%2EeyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2hyaXN0aWFuaWFicG9zLnNoYXJlcG9pbnQuY29tQDc5ZGMyMjhmLWM4ZjItNDAxNi04YmYwLWI5OTBiNmM3MmU5OCIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2OTE0OTM1NjkiLCJleHAiOiIxNjkxNTE1MTY5IiwiZW5kcG9pbnR1cmwiOiJuREtDbCtOTDNiazlkTDRjUzVaa1JsS3lsZndrWE9wUnRLVXZ4cFB3YzlZPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTc0IiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiJvTTV3eHRVUUFHRDlvOXgyOGtERjVRPT0iLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiTVRVek5tVmtNemN0TmpVMU1pMDBOV1k1TFRoalpUVXROVGd4Tm1abVpESmtObVF5Iiwic2lnbmluX3N0YXRlIjoiW1wia21zaVwiXSIsIm5hbWVpZCI6IjAjLmZ8bWVtYmVyc2hpcHxuaWVscy5qb2hhbnNlbkBuZXhpZ3JvdXAuY29tIiwibmlpIjoibWljcm9zb2Z0LnNoYXJlcG9pbnQiLCJpc3VzZXIiOiJ0cnVlIiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwM2JmZmQ4MGQxYTgyOUBsaXZlLmNvbSIsInNpZCI6IjQxNTYwZjRlLWY4NjYtNDcwZi1iMmYzLTU5NTBjYjA2ZDQzYyIsInR0IjoiMCIsImlwYWRkciI6Ijc4LjE0My42Ni4xMzEifQ%2EP4c%5FHbFiskRzWFoROQM37Yjjkz4Vvd0NI6nHrxJkbJk%26version%3DPublished&amp;encodeFailures=1&amp;width=1280&amp;height=720'>

<!-- Twitter Meta Tags -->
<meta name='twitter:card' content='summary_large_image'>
<meta property='twitter:domain' content='home.nexi-intra.com/link/1h-2023-financial-results'>
<meta property='twitter:url' content='https://christianiabpos.sharepoint.com/sites/nexi/SitePages/1H-2023-Financial-Results.aspx'>
<meta name='twitter:title' content='1H 2023 Financial Results - Nexi Group Intranet'>
<meta name='twitter:description' content='Solid Financial Performance with 8.1% growth in revenues year-on-year and continued EBITDA margin expansion.

Sustained volume growth in all our geographies and businesses.

2023 Guidance confirmed in line with CMD medium-long term growth ambition.'>
<meta name='twitter:image' content='https://westeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&amp;inputFormat=mp4&amp;cs=fFNQTw&amp;correlationId=c670cea0-10d5-6000-fda3-dc76f240c5e5&amp;docid=https%3A%2F%2Fchristianiabpos%2Esharepoint%2Ecom%2Fsites%2Fnexi%2F%5Fapi%2Fv2%2E0%2Fdrives%2Fb%21N%2D02FVJl%2DUWM5VgW%5F9LW0hyhlcwNz5dEm9vSvKvlL9kQOiA4mpFERJHky6xKt3bX%2Fitems%2F017Z6Y34IPLB36EGTVUBBICO75XGENDPUN%3Ftempauth%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9%2EeyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2hyaXN0aWFuaWFicG9zLnNoYXJlcG9pbnQuY29tQDc5ZGMyMjhmLWM4ZjItNDAxNi04YmYwLWI5OTBiNmM3MmU5OCIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2OTE0OTM1NjkiLCJleHAiOiIxNjkxNTE1MTY5IiwiZW5kcG9pbnR1cmwiOiJuREtDbCtOTDNiazlkTDRjUzVaa1JsS3lsZndrWE9wUnRLVXZ4cFB3YzlZPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTc0IiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiJvTTV3eHRVUUFHRDlvOXgyOGtERjVRPT0iLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiTVRVek5tVmtNemN0TmpVMU1pMDBOV1k1TFRoalpUVXROVGd4Tm1abVpESmtObVF5Iiwic2lnbmluX3N0YXRlIjoiW1wia21zaVwiXSIsIm5hbWVpZCI6IjAjLmZ8bWVtYmVyc2hpcHxuaWVscy5qb2hhbnNlbkBuZXhpZ3JvdXAuY29tIiwibmlpIjoibWljcm9zb2Z0LnNoYXJlcG9pbnQiLCJpc3VzZXIiOiJ0cnVlIiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwM2JmZmQ4MGQxYTgyOUBsaXZlLmNvbSIsInNpZCI6IjQxNTYwZjRlLWY4NjYtNDcwZi1iMmYzLTU5NTBjYjA2ZDQzYyIsInR0IjoiMCIsImlwYWRkciI6Ijc4LjE0My42Ni4xMzEifQ%2EP4c%5FHbFiskRzWFoROQM37Yjjkz4Vvd0NI6nHrxJkbJk%26version%3DPublished&amp;encodeFailures=1&amp;width=1280&amp;height=720'>

<!-- Meta Tags Generated via DNSChecker.org -->
 */