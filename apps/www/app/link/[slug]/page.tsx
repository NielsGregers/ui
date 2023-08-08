import { siteConfig } from "@/app/news/config/site";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getToken, getRootSite, getSubSite, getItem } from "@/lib/officegraph"
import { Links } from "@/services/sharepoint/nexiintra-home/sharepoint"
import { z } from "zod"
import { de } from "date-fns/locale";
//import { Country, Unit } from "./schema"


async function getPage(slug: string) {
  const token = await getToken(process.env.SPAUTH_TENANTID as string, process.env.SPAUTH_CLIENTID as string, process.env.SPAUTH_CLIENTSECRET as string)
  const rootSiteResponse = await getRootSite(token)
  const subSiteResponse = await getSubSite(token, rootSiteResponse.data?.siteCollection.hostname as string, "sites/nexiintra-home")

  const { data, hasError, errorMessage } = await getItem(token, subSiteResponse.data?.id as string, Links.listName, "Slug", slug);
  if (hasError) {
    console.log(errorMessage);
  }
  
  if (data?.value && data?.value.length > 0) {
    return Links.map(data?.value[0]);
  }

  return null

  

}
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {


  
    const page = await getPage(params.slug)

  return {
    title: {
      default: page?.Title,
      template: `%s - ${page?.Description}`,
    },
    description: page?.Description,
    // keywords: [
    //   "Next.js",
    //   "React",
    //   "Tailwind CSS",
    //   "Server Components",
    //   "Radix UI",
    // ],
    authors: [
      {
        name: page?.CreatedBy,
       // url: page?.CreatedBy,
      },
    ],
    creator: page?.CreatedBy,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: page?.URL,
      title: page?.Title,
      description: page?.Description,
      siteName: "Nexi Group Intranet",
      images: [
        {
          url: page?.Image,
          width: 1200,
          height: 630,
          alt: page?.Title,
        },
      ],
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title: siteConfig.name,
    //   description: siteConfig.description,
    //   images: [siteConfig.ogImage],
    //   creator: "@shadcn",
    // },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  }
  return {
    title: 'Next.js',
  }
}

// export async function metadata(
//   a : any
// ): Promise<Metadata> {
//   // read route params
// debugger
//   const x = await a
//   debugger
//   const page = await getPage("news")

//   return {
//     title: {
//       default: page?.Title,
//       template: `%s - ${page?.Description}`,
//     },
//     description: page?.Description,
//     // keywords: [
//     //   "Next.js",
//     //   "React",
//     //   "Tailwind CSS",
//     //   "Server Components",
//     //   "Radix UI",
//     // ],
//     authors: [
//       {
//         name: page?.CreatedBy,
//        // url: page?.CreatedBy,
//       },
//     ],
//     creator: page?.CreatedBy,
//     themeColor: [
//       { media: "(prefers-color-scheme: light)", color: "white" },
//       { media: "(prefers-color-scheme: dark)", color: "black" },
//     ],
//     openGraph: {
//       type: "website",
//       locale: "en_US",
//       url: page?.URL,
//       title: page?.Title,
//       description: page?.Description,
//       siteName: "Nexi Group Intranet",
//       images: [
//         {
//           url: page?.Image,
//           width: 1200,
//           height: 630,
//           alt: page?.Title,
//         },
//       ],
//     },
//     // twitter: {
//     //   card: "summary_large_image",
//     //   title: siteConfig.name,
//     //   description: siteConfig.description,
//     //   images: [siteConfig.ogImage],
//     //   creator: "@shadcn",
//     // },
//     icons: {
//       icon: "/favicon.ico",
//       shortcut: "/favicon-16x16.png",
//       apple: "/apple-touch-icon.png",
//     },
//     manifest: `${siteConfig.url}/site.webmanifest`,
//   }
// }

export default function Page({ params, searchParams }: Props) {

  return <div>Hello</div>
}
