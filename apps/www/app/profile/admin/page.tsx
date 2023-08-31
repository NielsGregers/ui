"use client"

import { useContext, useEffect, useState } from "react"
import { ParkingSquare } from "lucide-react"
import { z } from "zod"

import { https } from "@/lib/httphelper"
import { LogToMongo } from "@/lib/trace"
import { GenericTable } from "@/components/table"
import { ISelectedItemsActionsComponent } from "@/components/table/components/GenericTableActions"
import { GenericItem } from "@/components/table/data/schema"
import { Button } from "@/registry/new-york/ui/button"
import { toast } from "@/registry/new-york/ui/use-toast"
import { MagicboxContext } from "@/app/magicbox-context"

import {
  createNewsChannelGroup,
  setNewsChannelGroupResourceBehaviour,
} from "../actions/memberships"
import { Me, NewsChannel } from "../data/schemas"
import { getNewsChannels } from "../data/sharepoint"

// export const schema = z.object({
//   title: z.string(),
//   link: z.string().nullable(),
//   details: z.string().nullable(),
//   id: z.string(),
//   // created_at:z.date().nullable(),
//   // updated_at:z.date().nullable(),
// })



export default function SettingsProfilePage() {
  const magicbox = useContext(MagicboxContext)

  const [newsChannels, setNewsChannels] = useState<any>([])

  const accessToken = magicbox.session?.accessToken ?? ""
  useEffect(() => {
    const load = async () => {
      const items = ((await getNewsChannels(accessToken)) ?? [])
        .sort((a, b) => {
          return a.channelName.localeCompare(b.channelName)
        })
        .map((channel) => {
          return {
            title: channel.channelName,
            link: "https://portal.azure.com/#view/Microsoft_AAD_IAM/GroupDetailsMenuBlade/~/Overview/groupId/" + channel.GroupId,
            details: channel.GroupId !== "" ? channel.GroupId : "No GroupId",
            id: channel.id,
          }
        })
      setNewsChannels(items)
    }
    if (accessToken) load()
  }, [accessToken])

  const createGroups = async (params: any) => {
    const meResponse = await https<Me>(
      magicbox.session?.accessToken ?? "",
      "GET",
      "https://graph.microsoft.com/v1.0/me"
    )
    if (meResponse.hasError) {
      toast({
        title: "Error:",
        variant: "destructive",
        description: meResponse.errorMessage,
      })
      return
    }
    const me = meResponse.data
    const items = params.rows.map((row: any) => {
      return row.original as GenericItem
    }).filter((item: GenericItem) => {
        return item.details !== "No GroupId"
        })
    LogToMongo("logs-niels", "createGroups", { me, items })
    //return

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      
      const res = await createNewsChannelGroup(me?.id ?? "", item.title)
      if (res.hasError) {
        toast({
          title: "Error:",
          variant: "destructive",
          description: res.errorMessage,
        })
        return
      }
      toast({
        title: "Group created " + res.data?.mail ?? "",
      })

      await https(
        magicbox.session?.accessToken ?? "",
        "PATCH",
        `https://graph.microsoft.com/v1.0/sites/christianiabpos.sharepoint.com:/sites/nexiintra-home:/lists/News Channels/items/${item.id}`,
        {
          fields: {
            GroupID: res.data?.id ?? "",
            Email: res.data?.mail ?? "",
          },
        }
      )
    }
  }
  const updateGroups = async (params: any) => {
    const meResponse = await https<Me>(
      magicbox.session?.accessToken ?? "",
      "GET",
      "https://graph.microsoft.com/v1.0/me"
    )
    if (meResponse.hasError) {
      toast({
        title: "Error:",
        variant: "destructive",
        description: meResponse.errorMessage,
      })
      return
    }
    const me = meResponse.data
    const items = params.rows.map((row: any) => {
      return row.original as GenericItem
    })
    const itemsToUpdate: GenericItem[] = items.filter((item: GenericItem) => {
      return item.details !== "No GroupId"
    })

    //return

    for (let i = 0; i < itemsToUpdate.length; i++) {
      const item = itemsToUpdate[i]
      const res = await setNewsChannelGroupResourceBehaviour(
        item.details ?? "",
        ["WelcomeEmailDisabled"]
      )
      LogToMongo("logs-niels", "updateGroups", { me, item, res })
      if (res.hasError) {
        toast({
          title: "Error:",
          variant: "destructive",
          description: res.errorMessage,
        })
        return
      }
      toast({
        title: "Group updated ",
      })
    }
  }

  return (
    <div className="container relative mt-3">
      <GenericTable
        data={newsChannels}
        actions={{
          selectedItemsActionsComponent: (params: any) => {
            return (
              <div>
                <Button onClick={() => createGroups(params)}>
                  Create Groups
                </Button>
                <Button onClick={() => updateGroups(params)}>
                  Update Groups
                </Button>
              </div>
            )
          },
        }}
      />
    </div>
  )
}
