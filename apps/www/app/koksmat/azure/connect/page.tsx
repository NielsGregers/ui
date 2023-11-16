"use client"

import React, { useContext, useMemo, useState } from "react"
import Link from "next/link"

import { Button } from "@/registry/new-york/ui/button"
import RunServerProcess from "@/app/koksmat/[tenant]/site/[site]/components/runserverprocess"
import { KoksmatContext } from "@/app/koksmat/context"
import { MagicboxContext } from "@/app/magicbox-context"
import { PageContextSectionHeader } from "../../[tenant]/site/[site]/components/page-section-header"
import { MessageType } from "../../[tenant]/site/[site]/server/MessageType"

export default function Connections() {
  const [siginUrl, setsiginUrl] = useState("https://microsoft.com/devicelogin")
  const [signinCode, setsigninCode] = useState("")
  const [accessChecked, setaccessChecked] = useState(false)
  const [hasAzAccess, sethasAzAccess] = useState(false)
  const [createPnpApp, setcreatePnpApp] = useState(false)
  const koksmat = useContext(KoksmatContext)
  const magicbox = useContext(MagicboxContext)
  const onMessage = (msg: MessageType) => {
    if (msg.isError) return

    if (msg.message.includes("enter the code")) {
      const code =
        msg.message.split("enter the code ")[1].split(" to authenticate")[0] ??
        ""
      setsigninCode(code)
    }

    console.log(msg)
  }
  const onAzMessage = (msg: MessageType) => {
    if (msg.message.includes("enter the code")) {
      const code =
        msg.message.split("enter the code ")[1].split(" to authenticate")[0] ??
        ""
      setsigninCode(code)
    }

    console.log(msg)
  }
 return (
    <div>
      {koksmat.currentKitchen && (
        <div>
          <PageContextSectionHeader title={"Establish Azure Connection"} />

          {accessChecked && !hasAzAccess && (
            // Try to login
            <RunServerProcess
              caption="Login to AZ"
              onMessage={onAzMessage}
              cmd={"az"}
              args={["login", "--use-device-code", "--allow-no-subscriptions"]}
              timeout={120}
              channelname={"az"}
              cwd={koksmat.currentKitchen.cwd}
            />
          )}
          <Button
            className="mb-3"
            disabled={createPnpApp}
            onClick={() => {
              setcreatePnpApp(true)
            }}
          >
            Register Application in Microsoft Entra ID
          </Button>
          {signinCode && (
            <div>
              {/* <div className="mb-3">
            Copy this, you will be asked to enter that code in the browser when you click the link below
          </div> */}
              <div>
                <textarea>{signinCode}</textarea>
              </div>

              <div>
                <Button variant="default">
                  <Link href={siginUrl} target="_blank">
                    Copy the code above, then click here
                  </Link>
                </Button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
