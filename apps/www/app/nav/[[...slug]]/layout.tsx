"use client"

import React, { ReactNode, use, useContext, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { NavigationContext, Position } from "@/navigator/context"

import { JourneyProps, Navigator } from "@/app/koksmat/navigator"
import travelplan from "@/app/koksmat/navigator/journeys/[journey]/[id]/[[...slug]]"
import { Waypoint } from "@/app/koksmat/navigator/navcomponents/journey-schema"

import { getLevels } from "."
import { journeyFromNodes } from ".."
import { nodes } from "../server"

//import travelplan from "@/app/koksmat/navigator/";
export default function JourneyLayout(props: {
  children: React.ReactNode
  params: { slug: string[] }

}) {
  const navigator = useContext(NavigationContext)
  const { slug } = props.params
  const id: string = useSearchParams()?.get("id") ?? ""
  //const [waypoints, setwaypoints] = useState<Waypoint[]>([])
  const { position } = navigator
  const [lastKnownPosition, setlastKnownPosition] = useState<Position>()

  useEffect(() => {
    
    const levels = getLevels(slug)
    const newPosition: Position = {
      journeyName: levels.journey,
      id: "",
      port: levels.port,
      container: levels.container,
    }
    navigator.setPosition(newPosition)
    const dirName =
      "/Users/nielsgregersjohansen/ports/deliver-danish-icing/.koksmat/tasks"

   
  }, [slug])

  useEffect(() => {

     if (!navigator) return
     if (navigator.waypoints.length > 0) return
      navigator.setWayPoints(travelplan.waypoints)
      navigator.postlog(
        "load",
        "loaded " + travelplan.waypoints.length + " waypoints"
      )
      //navigator.ship("meetingPurpose:0","run")
      //setwaypoints(journeyFromNodes(tree))
 
  }, [navigator])
  

  return (
    <div>
      {/* <pre>
        {JSON.stringify(waypoints,null,2)}
      </pre>  */}

      <Navigator
        rootPath="/nav/cava/"
        params={{
          journey: "cava2",
          slug: props.params.slug,
        }}
        travelplan={{
          journey: "journey",
          triggers: [],
          metadata: {
            app: "cava2",
            name: "Serve Danish Icing",
            description: "",
          },
          waypoints:navigator.waypoints,
        }}
      >
        <div>{props.children}</div>
      </Navigator>
    </div>
  )
}
