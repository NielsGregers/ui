"use client"

import { useEffect, useState } from "react"
import { z } from "zod"

import { PortMap, SeaView } from "@/app/koksmat/navigator"
import { SeaViewForm } from "@/app/koksmat/navigator/ui-components/items/form"
import { PageContextHeader } from "@/app/koksmat/tenants/[tenant]/site/[site]/components/page-context-header"

import travelplan from "."
import { JourneyView } from "../../../../navcomponents/journey"

export default function Page(props: {
  params: { id: string; journey: string; slug: string[] }
}) {
  const { slug, journey } = props.params
  const [id, setid] = useState("")
  useEffect(() => {
    setid(decodeURIComponent(props.params.id))
  }, [props.params.id])

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
                    href: "/koksmat/navigator/journeys/" +
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
            })} currentPath={""}          />
        </div>
        <div className="grow">
          <JourneyView
            travelplan={travelplan}
            id={id}
            journey={journey}
            slug={slug}
          >
            <SeaView match="Planning" value="1">
              <div>
                <SeaViewForm
                  schema={z.object({
                    CreatedBy: z.string(),
                    Created: z.date(),
                    ModifiedBy: z.string(),
                    Modified: z.date(),
                    Id: z.string(),
                    eTag: z.string(),
                    Title: z.string(),

                    field_1: z.string(),
                    field_2: z.string(),
                    ContactPerson: z.string().nullable(),
                    PrimaryLocation: z
                      .object({
                        LookupId: z.number(),
                        LookupValue: z.string(),
                      })
                      .nullable(),
                  })}
                />
              </div>
            </SeaView>
            <SeaView match="Invoicing" value="2" />

            <div></div>
          </JourneyView>
        </div>
      </div>
    </div>
  )
}
