"use client";

import { off } from "process";
import { useEffect, useState } from "react";
import { NewsChannel } from "../schemas/NewsChannelSchema";
import { Badge } from "@/registry/new-york/ui/badge";


export interface NewsChannelProps  {
  country : string
  unit:string
  channels : NewsChannel[]
}
export function NewsChannels(props: NewsChannelProps) {
  const { country, unit, channels } = props
  const [defaultSelected, setdefaultSelected] = useState<NewsChannel[]>([])


  function match(channel:NewsChannel) : boolean {  
    let found = false
      channel?.RelevantUnits?.forEach((relevantUnit) => {
        
        if (relevantUnit.LookupValue.toLowerCase() === unit) {
          found = true
        }
      })
      channel?.RelevantCountires?.forEach((relevantCountry) => {
        
        if (relevantCountry.LookupValue.toLowerCase() === country) {
          found = true
        }
      })

  return found
}

  useEffect(() => {
    const defaults : NewsChannel[] = []
    channels.forEach((channel) => {

      if (channel.Mandatory) {
        defaults.push(channel)
        return
      }
    
      if (match(channel)) {
        defaults.push(channel)
        return
      }

    })
    setdefaultSelected(defaults)
  }, [country, unit])
  
  return <div className="flex">
    

    {defaultSelected.map((channel,key) => {
      return <Badge className="ml-1" variant="secondary" key={key}>{channel.channelName}</Badge>
    } )}
    <br/>

{/* <br/>
<pre className="mt-[1000px]">
{JSON.stringify(channels,null,2)}
</pre> */}
  </div>
  
  
  ;
}
