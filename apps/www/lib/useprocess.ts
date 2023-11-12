"use client"

import { useEffect, useState } from "react"

import { run } from "@/app/koksmat/[tenant]/[site]/server"

export const version = 1

export function useProcess(
  cmd: string,
  args: string[],
  timeout: number,

  channel: string,
  cwd?:string
) {
  const [data, setdata] = useState<any>()
  const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState("")
 
  useEffect(() => {
    const load = async () => {
      seterror("")
      const result = await run(cmd, args, timeout, channel,cwd)
      
      setisLoading(false)
      if (result.hasError) {
        seterror(result.errorMessage ?? "Unknown error")
       
        return
      }else
      {
        setdata(result.data)
      }
    }
    if (channel && cmd && timeout && args) {
     
        load()
      
    }
  }, [channel, cmd, timeout, args,cwd])

  return {
    data,
    error,
    isLoading,
  }
}
