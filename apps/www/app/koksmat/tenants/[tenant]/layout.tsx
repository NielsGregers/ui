
"use client"
import "@/styles/globals.css"
import { useContext, useEffect } from "react"
import { KoksmatContext } from "../../context"



interface RootLayoutProps {
  children: React.ReactNode
  params: {  tenant: string }
}


export default function RootLayout({ children, params }: RootLayoutProps) {
  const { tenant } = params
  const koksmat = useContext(KoksmatContext)
  useEffect(() => {
    if (tenant) koksmat.setTenantContext(tenant)
  
 
  }, [tenant,koksmat])
  
  
  return (
    <div className="ml-3">
   
        {children}

    </div>
  )
}
