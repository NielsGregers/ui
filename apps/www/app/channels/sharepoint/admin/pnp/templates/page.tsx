"use client"

import { useEffect, useState } from "react"
import { getTemplate } from "."

export default function SharePointDashboardPage() {
    const [template, settemplate] = useState<any>()
    useEffect(() => {
        const load = async () => {
            const xml = await getTemplate()
            if (xml) {
               
                settemplate(xml)
            }
        }
       load()

    }, [])

    return (
        <>
            <pre>{JSON.stringify(template, null, 2)}</pre>
        </>
    )
}
