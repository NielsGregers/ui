"use client";
import { https, httpsGetAll } from "@/lib/httphelper";
import { cn } from "@/lib/utils"
import { useContext, useEffect, useState } from "react";
import { ToolbarItem } from "../data/sharepoint";
import {Root as UserProfile} from "../data/sharepoint/userprofile"

type openInOptions = "Same page" | "New page" | "Popup"
export interface ToolProps extends React.HTMLAttributes<HTMLDivElement> {
  link: string
  displayName: string
script:string
  iconUrl: string,
  openIn: openInOptions
}

export function Tool({
  link,
  script,
  displayName,
  className,
  iconUrl,
  openIn,
  ...props
}: ToolProps) {
const [url, seturl] = useState(link)

const customizeScript = (script:string)=>{
  /**
function customizeTile(tile) {
var country = localStorage.getItem("country");
switch (country) {
case "slovenia":
case "croatia":
tile.jumpto =
"https://timepak/tpak/index.php";
tile.inShort = "Nets South"
break;
case "germany":
case "schweiz":
case "austria":
tile.jumpto =
"http://novatime.concardis.local:7777/cgi-bin/htm_work.cgi";
tile.inShort = "Nets DACH"
break;
default:
break;
}

return tile
}   
    
   */
  if (!script) return
  try {
    const tile = {
      jumpto:link,
      inShort:displayName,
      openIn:openIn
    }
    console.log("customizeTile - before script",tile)
    const scriptToRun = `
    ${script};
  
     customizeTile(tile) 
    `
    
    console.log("customizeTile - scriptToRun",scriptToRun)
    eval(scriptToRun)
    console.log("customizeTile - after script",tile)
  seturl(tile.jumpto)
  } catch (error) {
    console.log("customizeTile - error",error)
  }

  
}
useEffect(() => {
  customizeScript(script)
}, [script])

  return (
    <div className="mt-4 cursor-pointer  px-[6px]  hover:bg-slate-400 hover:transition-transform">
      <div className="mt-4 cursor-pointer  p-[6px] hover:scale-[115%]">
        <div className={cn(className)} {...props}>
          <a href={url} target="_blank" rel="noreferrer" onClick={(e)=>{
            e.preventDefault()

              window.parent.postMessage(
                {
                  type: "showtool",
                  data: {link:url,displayName,iconUrl,openIn},
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
      const profileResponse = await https<UserProfile>(accessToken, "GET","https://graph.microsoft.com/v1.0/sites/christianiabpos.sharepoint.com:/sites/nexiintra-hub:/lists/User Profiles/items?$expand=fields&$filter=fields/Title+eq+'niels.johansen@nexigroup.com'")
      debugger
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

      {tools?.sort((a, b) => a.fields.SortOrder - b.fields.SortOrder).map((tool, key) => { return <Tool script={tool.fields.Script ?? ""} key={key} link={tool.fields.Link_x0020_URL.Url} displayName={tool.fields.Title} iconUrl={tool.fields.Icon.Url} openIn={tool.fields.Openin as openInOptions ?? "New page"} /> })}

    </div>
  )
}