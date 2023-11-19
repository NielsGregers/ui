"use client"

import { useContext, useEffect, useState } from "react"
import { Car } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"
import { Button } from "@/registry/new-york/ui/button"
import { Label } from "@/registry/new-york/ui/label"
import { Container, Port, Shipping, Waypoints } from "@/app/koksmat/navigator"

import travelplan, { CargoHold } from "."
import { NavigationContext } from "../../context"

export default function Page(props: { params: { slug: string[] } }) {
  function properties<T>(obj: object) {
    const x = Object.keys(obj) as (keyof T)[]
    return x
  }

  const navigator = useContext(NavigationContext)
  const { slug } = props.params
  const { instanceId, setInstanceId } = navigator
  const [seed, setseed] = useState("meetingPurpose:0")

  const [cargoHold, setcargoHold] = useState<CargoHold>()

  useEffect(() => {
    const c = new CargoHold(travelplan)
    setcargoHold(c)
    return () => {
      if (cargoHold) {
        cargoHold.close()
      }
    }
  }, [])

  const [journey, setjourney] = useState("")
  useEffect(() => {
    navigator.ship(seed, "test")
    //    navigator.setTraceLevel("debug")
  }, [navigator, seed])

  useEffect(() => {
    if (slug && slug.length > 0) {
      const id = slug[0]
      if (id !== journey) {
        setjourney(id)
      }
    }
    if (slug && slug.length > 1) {
      const id = slug[1]
      if (id !== instanceId) {
        setInstanceId(id)
      }
    }
  }, [slug])

  return (
    <div>
      {navigator.traceLevel > 4 && (
        <pre>{JSON.stringify(navigator, null, 2)}</pre>
      )}
      <Card className="m-4">
        <CardHeader>
          <CardTitle>
            {travelplan.metadata.name + "(" + slug ? slug[0] : "n.a." + ")"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-2/4">
            <div className="text-xl">The ship is loaded with</div>

            <table>
              <tr className="mt-3 font-bold">
                <td className="w-[200px]">Key</td>
                <td>Value</td>
              </tr>

              {Array.from(navigator.bag.keys()).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{navigator.bag.get(key)}</td>
                </tr>
              ))}
            </table>
          </div>
        </CardContent>
      </Card>
      <div className="mr-6 flex">
      <div>
        {/* <Label>Tracelevel</Label> */}
        <div className="flex space-x-2">
          <Button
            variant={"link"}
            onClick={() => navigator.setTraceLevel("warning")}
          >
            Warning
          </Button>
          <Button
            variant={"link"}
            onClick={() => navigator.setTraceLevel("info")}
          >
            Info
          </Button>
          <Button
            variant={"link"}
            onClick={() => navigator.setTraceLevel("debug")}
          >
            Debug
          </Button>
        </div>
        {/* <div>
          <Button onClick={() => navigator.newBatch()}>New batch</Button>
        </div> */}
      </div>
        <div className="grow"></div>
        <div className="text-xs">
          Journey: {journey} Id: {instanceId} Batch {navigator.batch} Version{" "}
          {navigator.version}
        </div>
      </div>

      {navigator.traceLevel > 4 && (
      <div>
        <div>
          <div>
            <div className="text-4xl">Roles</div>
            <pre>{JSON.stringify(cargoHold?.roleTypes, null, 2)}</pre>
          </div>
          <div>
            <div className="text-4xl">Entities</div>
            <pre>{JSON.stringify(cargoHold?.cargoTypes, null, 2)}</pre>
          </div>
        </div>
      </div>
      )}
      <Waypoints>
        {travelplan.waypoints.map((waypoint) => {
          return (
            <div key={waypoint.port}>
              <Port portname={waypoint.port}>
                {waypoint.loads.containers.map((container) => {
                  return (
                    <div key={container.name}>
                      <Container containername={container.name}>
                        <Shipping
                          label={container.name}
                          need={container.needs[0] + ":" + navigator.batch}
                          produce={
                            container.produces[0] + ":" + navigator.batch
                          }
                          dontparse={true}
                          script={container.script}
                          simulate={true}
                          timeout={30}
                        />
                      </Container>
                    </div>
                  )
                })}
              </Port>
            </div>
          )
        })}
      </Waypoints>
    </div>
  )
}
