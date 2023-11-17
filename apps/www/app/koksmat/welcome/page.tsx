"use client"

import React, { useContext, useMemo, useState } from "react"

import { Button } from "@/registry/new-york/ui/button"
import { KoksmatContext } from "@/app/koksmat/context"

import { PowerShell } from "../components/powershell"
import { PageContextSectionHeader } from "../tenants/[tenant]/site/[site]/components/page-section-header"
import ListAzAccounts from "./az-accounts"
import Link from "next/link"
import { CardContent, CardFooter } from "@/registry/default/ui/card"
import { Card } from "@/registry/new-york/ui/card"

export default function AzSubscriptions() {
  const [tryDebug, settryDebug] = useState(false)
  const { setOptions, options } = useContext(KoksmatContext)
  const { showDebug, showContext } = options
  const [answer, setanswer] = useState("?")
  return (
    <div>
      <PageContextSectionHeader title={"Introducing Koksmat (Preview)"} />
      <div>
        Welcome to Koksmat. Your helping hand in our digital Kitchen. The word
        Koksmat is danish and means the helping hand to the chef in the kitchen
        of a ship.
      </div>
      <div className="pt-5">
        Helping each others succeed with our work and share our knowledge is
        what this is all about.
      </div>

      <div className="pt-5">
        Koksmat is based on a Open Source repository on GitHub. The repository
        is called{" "}
        <a
          className="text-blue-700"
          target="_blank"
          href="https://github.com/koksmat-com"
        >
          https://github.com/koksmat-com
        </a>
        . You can learn more about that on{" "}
        <a
          className="text-blue-700"
          target="_blank"
          href="https://learn.koksmat.com"
        >
          learn.koksmat.com
        </a>
      </div>
      <div className="mt-3">
        When you turn on debug, you will see the options to show the Terminal
        output of any component executing script on your machine. In the menu you will find the
         option for turning debug on and off.
        </div>
        <div className="mt-3">
       
      </div>
      <Card className="mr-8">
        <CardContent className="p-4">
          <div className="font-mono text-2xl"> 
        What is 1+2? </div><div className="mt-3 font-mono text-2xl">Server answers: <span className="font-bold">{answer}</span>
      </div>
<div className="mt-4">
<Button className="mb-4"  variant={"link"}
          onClick={() => {
            settryDebug(true)
            setOptions({ showDebug: !showDebug, showContext })
          }}
        >
          {showDebug
            ? "Turn off"
            : !tryDebug
            ? "Click here to try Turning on debug"
            : "Turn on debug"}
        </Button>
      <PowerShell<any>
        
        script={`  
    Write-Host (1+2)
    `}
        onData={(data) => {setanswer(data)}}
        onError={() => {}}
      />
      {/* <RunServerProcess cmd={'pwsh'} args={["/Users/nielsgregersjohansen/kitchens/noma/get-site-allpages-test.ps1","-siteurl","https://christianiabpos.sharepoint.com/sites/nexiintra-hub"]} timeout={3600} channelname={'pwsh'}  />
       */}
       </div>

        </CardContent>
        <CardFooter>
        
          </CardFooter>      </Card>
      
       <div className="mt-4">
       <Button>
            <Link href="/koksmat/welcome/connect">Continue</Link>
            
            </Button>
            </div>
    </div>
  )
}
