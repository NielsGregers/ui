"use client"

import { useContext, useEffect, useState } from "react"
import { NavigationContext } from "@/navigator/context"
import { Button } from "@/registry/new-york/ui/button"
import { Container, Port } from "@/app/nav/components"
import { launchPageFromSlug } from "@/app/nav/server"

export default function Page() {
  const navigator = useContext(NavigationContext)
  const { cargo, position, currentWaypoint, currentContainer,version } = navigator

  const [time, settime] = useState<string>("")
  const [place, setplace] = useState<string>("")
  const [resourceRequirements, setresourceRequirements] = useState<string[]>([])
  const [resourceBookings, setresourceBookings] = useState<string[]>([])
  useEffect(() => {
    settime(cargo("time")??"")
    setplace(cargo("place")??"")
    setresourceRequirements(cargo("resources-requirements")?.split(" ")??[])
    setresourceBookings(cargo("resources-bookings")?.split(" ")??[])
  }, [version])
  
  
  return (
    <div>
    <div className="min-h-screen">
 {navigator.version}
<div>time: {time}</div>
<div> place: {place}</div>
<div>requirements: {resourceRequirements.join(",")}</div>
<div>bookings: {resourceBookings.join(",")}</div>
   
  <Button onClick={()=>{
    navigator.ship("resources-bookings",new Date().toISOString())
  }}>
    {resourceBookings.length>0 ? "Update Bookings":"Make Bookings"}
  </Button>
    
    
 
    </div>
         <Button
         onClick={async () => {
           launchPageFromSlug(
             position.journeyName,
             `port/${position.port}/container/${position.container}`
           )
         }}
       >
         Edit Page
       </Button>
    </div>
  )
}
