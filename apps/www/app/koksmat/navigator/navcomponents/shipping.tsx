"use client"

import React, { useContext, useEffect, useState } from "react"
import { set } from "date-fns"

import { KoksmatContext } from "@/app/koksmat/context"

import { PowerShell } from "../../components/powershell"
import { PageContextSectionHeader } from "../../tenants/[tenant]/site/[site]/components/page-section-header"
import { NavigationContext } from "../context"

interface ShippingProps {
  label:string,
  need: string
  produce: string
  dontparse: boolean
  script: string
  showDebug?: boolean
  timeout: number
  children?: React.ReactNode | React.ReactNodeArray
}

export default function Shipping(props: ShippingProps) {
  const navigator = useContext(NavigationContext)
  const { need, produce,label } = props

  const [data, setdata] = useState("")
  const [error, seterror] = useState("")
  const [log, setlog] = useState("")

  const { bag, ship, batch,version } = navigator
  const [satisfied, setsatisfied] = useState(false)
  const [working, setworking] = useState(false)
  const [lastbatch, setlastbatch] = useState(-1)
  const [ran, setran] = useState(true)
  const [currentVersion, setcurrentVersion] = useState(0)

  useEffect(() => {
    if (batch !== lastbatch) {
      setlastbatch(batch)
      setsatisfied(false)
    }
 
  }, [batch, lastbatch, navigator])

  useEffect(() => {
    
    if (need===""){
      setsatisfied(true)
      setworking(true)
      setran(false)
      return
    }
    if (bag.has(need))  {
      setsatisfied(true)
      setworking(true)
      setran(false)
    }
  }, [batch, need, bag,currentVersion])

  // useEffect(() => {
  //   if (!satisfied) return
  
  //     setworking(true)
  //     setran(false)
     
  // }, [satisfied])

  useEffect(() => {

      setcurrentVersion(version)
    
  }, [version])

  
  return (
    <div>
    
      <PowerShell<any>
        {...props}
        ran={ran}
        setran={r=>{
          
          setran(r)}}
        onData={(data) => {
          setworking(false)
          ship(produce, data)
          setdata(data)
        }}
        onMessage={(message) => {
          setlog(message.message)
        }}
        onError={(error) => {
          seterror(error)
        }}
      />
      
      <div>
        <div className="mb-4">
          <div className="font-bold">{label}</div>
          <div className="text-xs">
          need: <span className="font-bold">{need?need:"n.a."} </span>  produce :<span className="font-bold">{produce} </span>satisfied <span className="font-bold">{satisfied ? "Satisfied" : "Not Satisfied"}{" "} </span>working:
          <span className="font-bold">{working ? "Working" : "Not Working"}</span>
          </div>
          <div className="font-bold text-green-500">{data}</div>
          <div className="font-bold text-red-600">{error}</div>
        </div>
        {error && (
          <div>
            <div>
              <div>Last Message</div>
              <div className="font-bold">{log}</div>
            </div>
            <div>
              <div>Error</div>
              <div className="font-bold text-red-600">{error}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
