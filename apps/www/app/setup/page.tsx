"use client"
import { Button } from "@/registry/new-york/ui/button"
import { getInstanceString, saveInstance } from "."
import { useEffect, useState } from "react"
import { Config } from "@/lib/config"


export const dynamic = "force-dynamic"

export default  function Setup() {
    const [config, setconfig] = useState<Config>()
    useEffect(() => {
        const load = async () => {
            const configObject = await getInstanceString()
            setconfig( JSON.parse(configObject))
        }
        load()


    }, [])

    return (
<div>
        <Button onClick={async () => { await saveInstance() }}> Save</Button>
<pre>
{JSON.stringify(config, null, 2)}

</pre>
</div>

    )
}
