import "@/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "./site"
import { KoksmatProvider } from "./contextprovider"

interface RootLayoutProps {
  children: React.ReactNode
  params: { site: string,tenant:string }
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
        {children}
      </KoksmatProvider>
    </div>
  )
}
