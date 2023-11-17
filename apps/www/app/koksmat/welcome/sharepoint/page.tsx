"use client"

import React, { useContext, useMemo, useState } from "react"
import Link from "next/link"

import { CardContent, CardHeader } from "@/registry/default/ui/card"
import { Badge } from "@/registry/new-york/ui/badge"
import { Button } from "@/registry/new-york/ui/button"
import { Card, CardFooter } from "@/registry/new-york/ui/card"
import { KoksmatContext } from "@/app/koksmat/context"
import RunServerProcess from "@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess"
import { MagicboxContext } from "@/app/magicbox-context"

import { AzContext, AzDomain } from "../../components/az-schema"
import { AzureContext } from "../../components/azureContext"
import { AzureDomain } from "../../components/azureDomains"
import { PowerShell } from "../../components/powershell"
import { SharePointContext } from "../../components/sharepointContext"
import { PageContextSectionHeader } from "../../tenants/[tenant]/site/[site]/components/page-section-header"
import { MessageType } from "../../tenants/[tenant]/site/[site]/server/MessageType"
import { WelcomeContext } from "../context"

export default function Connections() {
  const [siginUrl, setsiginUrl] = useState("https://microsoft.com/devicelogin")
  const [signinCode, setsigninCode] = useState("")
  const [accessChecked, setaccessChecked] = useState(false)
  const [hasSharePointAccess, sethasSharePointAccess] = useState(false)
  const [azureContext, setazureContext] = useState<AzContext.Root>()
  const [error, seterror] = useState("")
  const [createPnpApp, setcreatePnpApp] = useState(false)
  const { setOptions, options } = useContext(KoksmatContext)
  const { showDebug, showContext } = options
  const magicbox = useContext(MagicboxContext)
  const [adminurl, setadminurl] = useState("")
  const welcomeContext = useContext(WelcomeContext)
  const [domains, setdomains] = useState<AzDomain.Root>([])
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
      <div>
        <PageContextSectionHeader title={"Connect to SharePoint"} />
        <div className="mb-3 max-w-[600px]">
          <div className="mt-3">
            SharePoint is considered the Primary data store for everything we
            do. So you need to establish a connection.
          </div>
          <div className="mt-3">
            This is done using the{" "}
            <a
              className="text-blue-700"
              target="_blank"
              href="https://learn.microsoft.com/en-us/powershell/sharepoint/sharepoint-pnp/sharepoint-pnp-cmdlets"
            >
              PnP PowerShell module
            </a>
          </div>
        </div>
        {!welcomeContext.tenant && (
          <div>
            <AzureDomain
              onData={(data) => {
                setdomains(data)
              }}
            />
            <div>Select the tenant you like to use</div>
            {domains &&
              domains.map((domain) => {
                return (
                  <div key={domain.Id}>
                    <div className="text-bold mr-4">{domain.Name}</div>
                    <div className="space-x-3">
                      {/* {domain.Domains.map((d)=>{return (<Badge key={d}>{d}</Badge>)} )} */}
                      {(
                        domain.Domains.filter(
                          (d) => d.toLowerCase().indexOf("onmicrosoft.com") > -1
                        ).filter(
                          (d) =>
                            d.toLowerCase().indexOf("mail.onmicrosoft.com") ===
                            -1
                        ) ?? []
                      ).map((d) => {
                        return (
                          <Button
                            variant={"link"}
                            key={d}
                            onClick={() => welcomeContext.settenant(d.split(".")[0].toLowerCase())}
                          >
                            {d.split(".")[0].toLowerCase()}
                          </Button>
                        )
                      })}
                    </div>{" "}
                  </div>
                )
              })}
          </div>
        )}
        {welcomeContext.tenant && (
          <Card className="mr-8">
            <CardHeader title="Access Check" />
            <CardContent>
              {!accessChecked && (
                <div>
                  <div> Checking access to SharePoint</div>
                  <div>
                    {" "}
                    <SharePointContext
                      onError={(error) => {
                        seterror(error)
                        sethasSharePointAccess(false)
                        setaccessChecked(true)
                      }}
                      onData={(url) => {
                        
                       
                        setaccessChecked(true)
                        sethasSharePointAccess(url !== "")
                        setadminurl(url)
                      }}
                      tenant={welcomeContext.tenant}
                    />
                  </div>
                </div>
              )}
              {error && <div className="text-red-600"> {error}</div>}

              {accessChecked && hasSharePointAccess && (
                <div>
                  Access to SharePoint looks good, this should be the App Catalogue.{" "}<a      className="text-blue-700" href={adminurl} target="_blank">{adminurl}</a>
                  <Button
                    variant={"link"}
                    onClick={() => welcomeContext.settenant("")}
                  >
                    Change tenant
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {signinCode && (
                <div>
                  <div>
                    <Button variant="default">
                      <Link href={siginUrl} target="_blank">
                        Copy the code above, then click here
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
              {hasSharePointAccess && <Button><Link href={"/koksmat/welcome/sharepoint/deploy/"+welcomeContext.tenant}>Continue</Link></Button>}
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
