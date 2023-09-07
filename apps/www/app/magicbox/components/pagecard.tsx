import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/new-york/ui/context-menu"
import { SitePage } from "@/app/profile/data/officegraph"
import Link from "next/link"


interface SitepageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  page: SitePage
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
  siteUrl:string,
  showDetails?: (page : SitePage) => void
}

export function SitepageCard({
  page,
  aspectRatio = "portrait",
  width,
  height,
  className,
  siteUrl,
  showDetails,
  ...props
}: SitepageCardProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="cursor-pointer overflow-hidden rounded-md" onClick={()=>{if (showDetails) showDetails(page)}}>
          
            <img
              src={page.thumbnailWebUrl}
              alt={page.name}
              style={{width,height}}
           
              className={cn(
                "h-auto w-auto overflow-clip object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
           
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem >Details</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
   
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{page.name}</h3>
        <p className="text-xs text-muted-foreground">{page.lastModifiedBy.user.displayName}</p>
      </div>
    </div>
  )
}
