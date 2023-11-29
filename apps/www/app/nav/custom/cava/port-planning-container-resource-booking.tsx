"use client"

import { useContext, useEffect, useState } from "react"
import { NavigationContext } from "@/navigator/context"
import { ca } from "date-fns/locale"

import { https, httpsGetAll } from "@/lib/httphelper"
import { Button } from "@/registry/new-york/ui/button"
import { Container, Port } from "@/app/nav/components"
import { SecurityContext } from "@/app/nav/context"
import { launchPageFromSlug } from "@/app/nav/server"

import MyCalendars from "./components/mycalendars"

export default function Page() {
  const navigator = useContext(NavigationContext)
  const security = useContext(SecurityContext)
  const [error, seterror] = useState("")
  const [interactionRequired, setinteractionRequired] = useState(false)
  const { cargo, position, currentWaypoint, currentContainer, version } = navigator
  const [calendarReadWriteSharedToken, setcalendarReadWriteSharedToken] = useState("")

  useEffect(() => {
    const load = async () => {
      const tokenResult = await security.getToken(
        ["Calendars.ReadWrite.Shared"],
        true
      )
      if (tokenResult.hasError) {
        setinteractionRequired(true)

        return
      }
      setcalendarReadWriteSharedToken(tokenResult.data ?? "")
    }
    load()
  }, [security])

  const interact = async () => {
    setinteractionRequired(false)
    const tokenResult = await security.getToken(
      ["Calendars.ReadWrite.Shared"],
      true
    )
    if (tokenResult.hasError) {
      seterror(tokenResult.errorMessage?.toString() ?? "unknown error")
      return
    }
    setcalendarReadWriteSharedToken(tokenResult.data ?? "")
  }

  if (!interactionRequired)
    return (
      <div>
        <Button onClick={async () => interact()}>
          We need you to accept XXXX ....
        </Button>
      </div>
    )

  if (!cargo("time-agreed")) return <div>Need time agreed</div>
  return (
    <div>
      {navigator.cargoKeys().map((cargoKey) => (
        <div key={cargoKey}>
          {cargoKey} {cargo(cargoKey)}
        </div>
      ))}

      <div className="min-h-screen">
        <MyCalendars token={calendarReadWriteSharedToken} />
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
