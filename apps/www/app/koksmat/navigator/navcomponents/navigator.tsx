"use client"

import { useEffect, useState } from "react"
import { JourneyView } from "@/navigator/navcomponents/journey"
import { z } from "zod"

import { JourneyProps, PortMap, SeaView } from "@/app/koksmat/navigator"
import { SeaViewForm } from "@/app/koksmat/navigator/ui-components/items/form"
import { PageContextHeader } from "@/app/koksmat/tenants/[tenant]/site/[site]/components/page-context-header"

export default function Navigator(props: {
    children: React.ReactNode,
  params: { journey: string; slug: string[] }
  travelplan: JourneyProps
}) {
  const { travelplan } = props
  const { journey, slug } = props.params
  const [id, setid] = useState("")

  return (
    <div>
      <div className="container flex">
        <div className="ml-4 mt-4 w-[300px]">
          <div>{travelplan.metadata.name}</div>
          <PortMap
            items={travelplan.waypoints.map((waypoint) => {
              return {
                title: waypoint.port,
                items: waypoint.loads.containers.map((container) => {
                  return {
                    title: container.name,
                    href:
                      "/journey/" +
                      journey +
                      "/" +
                      id +
                      "/" +
                      waypoint.port +
                      "/container/" +
                      container.name,
                    //label: "xxx",
                    items: [],
                  }
                }),
              }
            })}
          />
        </div>
        <div className="grow">
          <JourneyView
            travelplan={travelplan}
            id={""}
            journey={journey}
            slug={slug}
          >
            <div>{props.children}</div>
          </JourneyView>
        </div>
      </div>
    </div>
  )
}
