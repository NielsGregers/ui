"use client"
import { useContext, useEffect } from "react"
import { KoksmatContext } from "@/app/koksmat/context"

interface DocsLayoutProps {
  children: React.ReactNode
  params: {
    workspace: string
    station: string
  }
}

export default function DocsLayout({ children, params }: DocsLayoutProps) {
  const koksmat = useContext(KoksmatContext)

  const { station, workspace } = params
  useEffect(() => {
    koksmat.setStationContext(workspace, station)
  }, [workspace, station, koksmat])
  return { children }
}
