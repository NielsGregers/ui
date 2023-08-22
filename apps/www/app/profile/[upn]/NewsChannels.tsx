"use client";

import { off } from "process";
import { useEffect, useState } from "react";
import { NewsChannel } from "../schemas/NewsChannelSchema";


export interface NewsChannelProps  {
  country : string
  unit:string
  channels : NewsChannel[]
}
export function NewsChannels(props: NewsChannelProps) {
  const { country, unit, channels } = props
  const [defaultSelected, setdefaultSelected] = useState<NewsChannel[]>([])


  function hasUnit(channel:NewsChannel) : boolean {  
 
      channel?.RelevantUnits?.forEach((relevantUnit) => {
        if (relevantUnit.LookupValue.toLowerCase() === unit) {
          return true
        }
      })
   

  return false
}

  useEffect(() => {
    const defaults : NewsChannel[] = []
    channels.forEach((channel) => {

      if (channel.Mandatory) {
        defaults.push(channel)
        return
      }
    
      if (hasUnit(channel)) {
        defaults.push(channel)
        return
      }

    })
    setdefaultSelected(defaults)
  }, [country, unit])
  
  return <div>
    {defaultSelected.map((channel,key) => {
      return <div key={key}>{channel.channelName}</div>
    } )}
<pre>
{JSON.stringify(defaultSelected,null,2)}
</pre>
<br/>
<pre>
{JSON.stringify(channels,null,2)}
</pre>
  </div>
  
  
  ;
}
