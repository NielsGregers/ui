"use client"
import { useContext, useEffect } from "react"
import { KoksmatContext } from "@/app/koksmat/context"

interface DocsLayoutProps {
  children: React.ReactNode
  params: {
    kitchen: string
    station: string
  }
}

export default function DocsLayout({ children, params }: DocsLayoutProps) {
  const koksmat = useContext(KoksmatContext)

  const { station, kitchen } = params
  useEffect(() => {
    koksmat.setStationContext(kitchen, station)
  }, [kitchen, station, koksmat])
  
  return <div>{ children }</div>
}
