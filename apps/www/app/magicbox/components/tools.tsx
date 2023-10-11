"use client";
import { httpsGetAll } from "@/lib/httphelper";
import { cn } from "@/lib/utils"
import { useContext, useEffect, useState } from "react";
import { ToolbarItem } from "../data/sharepoint";



export interface ToolProps extends React.HTMLAttributes<HTMLDivElement> {
  link: string
  displayName: string

  iconUrl: string
}

export function Tool({
  link,
  displayName,
  className,
  iconUrl,
  ...props
}: ToolProps) {





  return (
    <div className="mt-4 cursor-pointer  px-[6px]  hover:bg-slate-400 hover:transition-transform">
      <div className="mt-4 cursor-pointer  p-[6px] hover:scale-[115%]">
        <div className={cn(className)} {...props}>
          <a href={link} target="_blank" rel="noreferrer" onClick={(e)=>{
            e.preventDefault()

              window.parent.postMessage(
                {
                  type: "showtool",
                  data: {link,displayName,iconUrl},
                },
                "*"
              )
          }}>
            <img src={iconUrl} alt={displayName} className="w-[32px] " />
          </a>

        </div>

      </div>
      <div className="w-[48px] whitespace-pre-wrap  text-center text-xs">
        {displayName}
      </div>
    </div>
  )
}

interface ToolsProps extends React.HTMLAttributes<HTMLDivElement> {
  accessToken: string
}

export function MagicBar({
  accessToken,
  className,

  ...props
}: ToolsProps) {



  const [tools, settools] = useState<ToolbarItem[]>()


  useEffect(() => {
    (async () => {
      if (!accessToken) return
      const response = await httpsGetAll<ToolbarItem>(accessToken, "https://graph.microsoft.com/v1.0/sites/christianiabpos.sharepoint.com:/sites/intranets-tools:/lists/ToolbarItems/items?$expand=fields&$filter=fields/ToolbarLookupId eq 2")
      if (response.hasError) {
        alert(response.errorMessage)
        return
      }
      settools(response.data)
    })()
  }
    , [accessToken])

  return (
    <div className={cn("overflow-hidden", className)} {...props}>

      {tools?.sort((a, b) => a.fields.SortOrder - b.fields.SortOrder).map((tool, key) => { return <Tool key={key} link={tool.fields.Link_x0020_URL.Url} displayName={tool.fields.Title} iconUrl={tool.fields.Icon.Url} /> })}

    </div>
  )
}
