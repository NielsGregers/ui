"use client"

import { useContext, useEffect } from "react"
import { KoksmatContext } from "@/app/koksmat/context"
interface RootLayoutProps {
  children: React.ReactNode,
  params: { workspace: string }
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const {workspace} = params
  const koksmat = useContext(KoksmatContext)

  useEffect(() => {
    koksmat.setKitchenContext(workspace)

  }, [workspace,koksmat])
  return (
    <div>
  {children}
  </div>
  )
}
