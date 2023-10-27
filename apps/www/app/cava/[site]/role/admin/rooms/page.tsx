"use client"

import { useContext, useEffect, useState } from "react"
import * as React from "react"

import { useToast } from "@/registry/new-york/ui/use-toast"
import { MagicboxContext } from "@/app/magicbox-context"
import { CavaContext } from "@/app/cava/cavacontext"
import { useSharePointList } from "@/app/sharepoint"
import { listName, ItemType, map } from "@/app/cava/[site]/sharepoint/lists/Rooms"
import { RoomsTable } from "@/app/cava/[site]/sharepoint/lists/Rooms/table"

export default function RoomAdminRole({ params }: { params: { site: string } }) {
  const magicbox = useContext(MagicboxContext)

  const { site } = params
  const tenant = magicbox.tenant
  const { items, error, isLoading } = useSharePointList(
    magicbox.session?.accessToken ?? "",
    tenant,
    site,
    listName
  )

const createNewRoom = async () => {
  const room = {
    Title: "New Room",
    Capacity: 1,
  
    Provisioning_x0020_Status: "New",
  }
}



  const [parsedItems, setparsedItems] = useState<ItemType[]>([])

  useEffect(() => {
    setparsedItems(items.map((item: any) => map(item)))
  }, [items])

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-700">{error}</div>}
      <RoomsTable
        items={parsedItems}
        site={site}
        listName={listName}
        viewFields={["Title", "Capacity","Email","Provisioning_x0020_Status"]}
      />
    </div>
  )
}
