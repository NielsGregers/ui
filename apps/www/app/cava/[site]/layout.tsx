import "@/styles/globals.css"

import { CavaProvider } from "./cavacontextprovider"

interface RootLayoutProps {
  children: React.ReactNode,
  params: {  site: string }
}

export default function RootLayout({ children,params}: RootLayoutProps) {



  return (
    <CavaProvider site={params.site} >
      {children }
    </CavaProvider>
  )
}
