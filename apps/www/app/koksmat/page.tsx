"use client"

import { useContext, useEffect, useMemo, useState } from "react"
import { MagicboxContext } from "../magicbox-context"

import Link from "next/link"
import { Button } from "@/registry/new-york/ui/button"
import { PageContextHeader } from "./[tenant]/[site]/components/page-context-header"
import { RootConfig } from "./rootconfig"

export default function Koksmat() {

const magicbox = useContext(MagicboxContext)

const [error, seterror] = useState("")


return (
<div className="container h-screen">
    {error && <div className="text-red-600">{error}</div>}
    <PageContextHeader title="Select Tenant" />
  
    <div>
        {RootConfig.instance().tenants.map(tenant => {
            return <div key={tenant.key}>
                <Link href={`/koksmat/${tenant.key}`}><Button variant={"link"}> {tenant.displayName}</Button></Link>
                </div>
        })}
    </div>
</div>

)

}