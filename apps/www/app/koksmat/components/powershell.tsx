"use client"

import { useState } from "react"

import RunServerProcess from "../tenants/[tenant]/site/[site]/components/runserverprocess"
import { tr } from "date-fns/locale"


export function PowerShell<T>(props: {
  script:string,
  args?: string[],
  dontparse?:boolean,
  children?: React.ReactNode,
  onData?: (data: T)=>void,
  onError?: (errorMessage: string) => void
}) {
const [error, seterror] = useState("")

  const [ran, setran] = useState(false)
  return (
    <div>
      {error && <div className="text-red-600">{error}</div>}
      <RunServerProcess
      caption="PowerShell"
      ran={ran}
      setran={setran}
        cmd={"pwsh"}
        args={props.args?props.args:[
          "-Command",
          props.script,
        ]}
        onData={(data) => {
          
          if (props.onData) {
            try {
              const s = data.replaceAll("\n","")
              console.log(s)
              if (props.dontparse) {
                props.onData(s as unknown as T)
                return
              }else
             {
              const o : T = JSON.parse(s)
              
              props.onData(o)
            }
            } catch (error) {
              if (props.onError) {
                
                props.onError("Cannot parse JSON from " +data)
              }
            }
            
          }
        
        }}
        onError={(data) => {
          debugger
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
