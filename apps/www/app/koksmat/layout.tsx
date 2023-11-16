import "@/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "./site"
import { KoksmatProvider } from "./contextprovider"
import { SiteHeader } from "./tenants/[tenant]/site/[site]/components/site-header"
import ClientLayout from "./tenants/[tenant]/site/[site]/clientlayout"
import { useProcess } from "@/lib/useprocess";
import { RunCentrifugo } from "./run-centrifugo"
interface RootLayoutProps {
  children: React.ReactNode
  params: { site: string, tenant: string }
}

export const metadata: Metadata = {
  title: {
    default: "Koksmat",
    template: `%s - Koksmat`,
  },

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,


  },

}


export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <div>
      <KoksmatProvider  >
        <SiteHeader />
        <RunCentrifugo/>
        <div >
          {children}
        </div>
      </KoksmatProvider>
    </div>
  )
}
