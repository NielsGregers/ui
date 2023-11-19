"use client"

import { useContext } from "react"

import { Container, Port, Waypoints, Ship } from "@/app/koksmat/navigator"
import { NavigationContext } from "@/app/koksmat/navigator/context"
import IcingMap from "./journeys/icing-map"
import { PageContextHeader } from "../tenants/[tenant]/site/[site]/components/page-context-header"
import { Card,CardTitle,CardDescription,CardContent,CardFooter,CardHeader } from "@/registry/default/ui/card"

export default function IcingMapPage() {
  const navigator = useContext(NavigationContext)
  const whatIf  = false
  return (
    <div>


        <Card className="m-4">
            <CardHeader>
            <CardTitle>
                Journey to get Icing on your SharePoint
            </CardTitle></CardHeader>
            <CardContent>
            <IcingMap whatIf={whatIf} />
            </CardContent>
        </Card>
     
    </div>
  )
}
