"use client"

import React, { useContext, useMemo, useState } from "react"

import { WelcomeContext } from "../../../context"
import { PageContextSectionHeader } from "@/app/koksmat/tenants/[tenant]/site/[site]/components/page-section-header"
import { SharePointKoksmatContext } from "@/app/koksmat/components/sharepointKoksmatContext"


export default function DeployKoksmat(props:{params:{tenant:string}}) {
 
  return (
    <div>
      <div>
        <PageContextSectionHeader title={"Install Koksmat"} />
        <div className="mb-3 max-w-[600px]">
          <div className="mt-3">
           <SharePointKoksmatContext tenant={props.params.tenant} />
          </div>
         
        </div>


      </div>
    </div>
  )
}
