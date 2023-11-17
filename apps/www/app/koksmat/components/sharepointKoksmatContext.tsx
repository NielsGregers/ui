"use client"

import { useContext } from "react"
import { MagicboxContext } from "@/app/magicbox-context"
import { PowerShell } from "./powershell"

export function SharePointKoksmatContext(props: {
  tenant: string
  onData?: (data: any) => void
  onError?: (errorMessage: string) => void
}) {
  const magicbox = useContext(MagicboxContext)

  return ( 
    <div>
      
    <PowerShell<any>
      dontparse
      script=""
      args={["-File",
        magicbox.root + "app/koksmat/powershell/connect-pnp-returnsiteinfo.ps1",
        "-tenantdomain",
        props.tenant,
        "-siteurl",
        "https://"+props.tenant+".sharepoint.com/sites/koksmat",
        "-kitchen",
        "danish",
      ]}
      onData={props.onData}
      onError={props.onError}
    />
    </div>
  )
}