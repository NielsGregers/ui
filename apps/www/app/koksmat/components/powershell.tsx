"use client"

import { useState } from "react"

import RunServerProcess from "../tenants/[tenant]/site/[site]/components/runserverprocess"


export function PowerShell<T>(props: {
  script:string,
  children?: React.ReactNode,
  onData?: (data: T)=>void,
  onError?: (errorMessage: string) => void
}) {


  const [ran, setran] = useState(false)
  return (
    <div>
      <RunServerProcess
      ran={ran}
      setran={setran}
        cmd={"pwsh"}
        args={[
          "-Command",
          props.script,
        ]}
        onData={(data) => {
          if (props.onData) {
            props.onData(JSON.parse(data))
          }
        
        }}
        onError={(data) => {
          if (props.onError) {
            props.onError(data)
          }
      
        }}
        timeout={3600}
        channelname={"pwsh"}
      />
    </div>
  )
}
