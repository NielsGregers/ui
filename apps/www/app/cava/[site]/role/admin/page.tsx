"use client"

import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"
import * as React from "react"


export default function AdminRole({ params }: { params: { site: string } }) {
  

  return (
    <div>
     <Link href={`/cava/${params.site}/role/admin/rooms`} as={`/cava/${params.site}/role/admin/rooms`}>
      <Button>Rooms</Button>
    
      
      </Link>
     
     </div>
  )
}
