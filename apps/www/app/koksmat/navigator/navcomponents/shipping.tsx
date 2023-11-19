"use client"

import React, { use, useContext, useEffect, useState } from "react"
import { set } from "date-fns"

import { KoksmatContext } from "@/app/koksmat/context"

import { PowerShell } from "../../components/powershell"
import { PageContextSectionHeader } from "../../tenants/[tenant]/site/[site]/components/page-section-header"
import { NavigationContext } from "../context"

export interface ShippingProps {
  label:string,
  need: string
  produce: string
  dontparse: boolean
  script: string
  showDebug?: boolean
  timeout: number
  simulate?: boolean
  children?: React.ReactNode | React.ReactNodeArray
}

export default function Comp(props: ShippingProps) {
  const navigator = useContext(NavigationContext)
  const { need, produce,label,simulate } = props

  const [data, setdata] = useState("")
  const [error, seterror] = useState("")
  const [log, setlog] = useState("")

  const { bag, ship, batch,version } = navigator
  const [satisfied, setsatisfied] = useState(false)
  const [working, setworking] = useState(false)
  const [lastbatch, setlastbatch] = useState(-1)
  const [ran, setran] = useState(true)
  const [currentVersion, setcurrentVersion] = useState(0)
  const [neededVersion, setneededVersion] = useState("")
  const [produceVersion, setproduceVersion] = useState("")

  useEffect(() => {
    if (produce !== produceVersion) {
      setproduceVersion(produce)
    }
  } , [produce, produceVersion])

  useEffect(() => {
    if (need !== neededVersion) {
      setneededVersion(need)
    }
  } , [need, neededVersion])

  useEffect(() => {
    if (!simulate) return
    const timer = setTimeout(() => {
      setsatisfied(true)

    }, 2000)
    return () => {if (timer) clearTimeout(timer)}
  } , [neededVersion,simulate])

  useEffect(() => {
    if (batch !== lastbatch) {
      setlastbatch(batch)
      setsatisfied(false)
    }
 
  }, [batch, lastbatch, navigator])

  useEffect(() => {
    
    if (need===""){
      setsatisfied(true)
      // setworking(true)
      // setran(false)
      return
    }
    if (bag.has(neededVersion))  {
      setsatisfied(true)
      // setworking(true)
      // setran(false)
    }
  }, [batch, neededVersion, bag, currentVersion, need])

  useEffect(() => {
    if (!satisfied) return
  
      setworking(true)
      setran(false)
     
  }, [satisfied])

  useEffect(() => {
    if (currentVersion !== version){
      setcurrentVersion(version)
    }
  }, [version])

  
  return (
    <div>
    
      
      {navigator.traceLevel > 3 &&  
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
      </div>}
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
    </div>
  )
}
