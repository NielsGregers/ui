"use client";

import { useContext, useEffect, useState } from "react";
import { KoksmatContext, KoksmatContextProps, RoleItem } from "./context";
import { MagicboxContext } from "@/app/magicbox-context";

export interface Root {
  "@odata.context": string
  "@microsoft.graph.tips": string
  value: Roles[]
}

export interface Roles {
  "@odata.etag": string
  createdDateTime: string
  eTag: string
  id: string
  lastModifiedDateTime: string
  webUrl: string
  createdBy: CreatedBy
  lastModifiedBy: LastModifiedBy
  parentReference: ParentReference
  contentType: ContentType
  "fields@odata.context": string
  fields: Fields
}

export interface CreatedBy {
  user: User
}

export interface User {
  email: string
  id: string
  displayName: string
}

export interface LastModifiedBy {
  user: User2
}

export interface User2 {
  email: string
  id: string
  displayName: string
}

export interface ParentReference {
  id: string
  siteId: string
}

export interface ContentType {
  id: string
  name: string
}

export interface Fields {
  "@odata.etag": string
  Title: string
  UserMapping: string
  Key: string
  id: string
  ContentType: string
  Modified: string
  Created: string
  AuthorLookupId: string
  EditorLookupId: string
  _UIVersionString: string
  Attachments: boolean
  Edit: string
  LinkTitleNoMenu: string
  LinkTitle: string
  ItemChildCount: string
  FolderChildCount: string
  _ComplianceFlags: string
  _ComplianceTag: string
  _ComplianceTagWrittenTime: string
  _ComplianceTagUserId: string
  Users?: User3[]
}

export interface User3 {
  LookupId: number
  LookupValue: string
  Email: string
}





import { useSharePointList } from "@/app/sharepoint";
import { set } from "date-fns";
import { CookingStation, Kitchen, findCookingStation, findKitchen } from "./[site]/kitchen";
import { useProcess } from "@/lib/useprocess";
type Props = {
  children?: React.ReactNode;

};

export const KoksmatProvider = ({ children }: Props) => {
  const magicbox = useContext(MagicboxContext)
  const [tenant, settenant] = useState("")
  const [site, setsite] = useState("")
  const [kitchen, setkitchen] = useState("")
  const [station, setstation] = useState("")
  const [domain, setdomain] = useState("")
  const [workspace, setworkspace] = useState<Kitchen>()
  const [currentstation, setcurrentstation] = useState<CookingStation>()
  const azAccount = useProcess("az", ["account","show"], 20, "echo")
  const azDomain = useProcess("pwsh", ["/Users/nielsgregersjohansen/code/koksmat/ui/apps/www/app/koksmat/az-activeuser-getdomain.ps1"], 20, "echo")

  const [isloaded, setisloaded] = useState(false)
  const { items, error, isLoading } = useSharePointList(
    magicbox.session?.accessToken ?? "",
    magicbox.tenant,
    site,
    "roles"
  )
  const [roles, setroles] = useState<RoleItem[]>([])

useEffect(()=>{
  if (azAccount && azAccount.data){
    const parsed = JSON.parse(azAccount.data)
    if (parsed?.homeTenantId){
      settenant(parsed?.homeTenantId)
    }
  }
} ,[azAccount])


useEffect(()=>{
  if (azDomain && azDomain.data){
    
      setdomain(azDomain.data.replace("\n",""))
    
  }
} ,[azDomain])
  useEffect(() => {
    setroles([])
    if (items && magicbox.session?.user && site) {
      setisloaded(false)
      const parsedItems = items.map((item: any) => {
        return item as Roles
      })
      setroles(parsedItems
        .filter((item: Roles) => {
          const users = item.fields.Users?.map((user: User3) => {
            return user.Email.toLowerCase()
          })
          return users?.includes(magicbox.session?.user?.email ?? "") ?? false
        })
        .map((item: Roles) => {
          const roleItem: RoleItem = {
            name: item.fields.Title,
            key: item.fields.Key,
            id: item.id,


          }
          return roleItem

        }))
      setisloaded(true)
    }
  }
    , [items, magicbox.session?.user,tenant,site])
useEffect(()=>{
  setworkspace(findKitchen(kitchen))
},[kitchen,setworkspace])


  const hasRole =  (role: string): boolean => {
    const email = magicbox.session?.user?.email ?? ""
    if (!email) return false
    if (!isloaded) return false
    const roleItem = roles.find((roleItem) => {
      let matched = false
      matched = roleItem.key === role
      return matched
    })

    if (!roleItem) return false
    return true

  }
  const koksmat: KoksmatContextProps = {
    roles: [],
    isloaded: false,
    tenant,
    site,
    hasRole,
    kitchen,
    domain,
    showToolbar: true,
    station,
    currentstation,
    currentKitchen: workspace,
    setSiteContext: function (tenant: string, site: string): void {
      //if (tenant) settenant(tenant);
      if (site) setsite(site);
    },
    setKitchenContext: function (kitchen: string): void {
      if (kitchen) {
        setkitchen(kitchen);
        const workspace = findKitchen(kitchen) 
        setworkspace(workspace)
        if (!currentstation && workspace?.stations?.length){
          setcurrentstation(workspace.stations[0])
          setstation(workspace.stations[0].key)
        }
      }
    },
    setStationContext: function (kitchen: string, station: string): void {
      if (kitchen) {
        setkitchen(kitchen);
        setworkspace(findKitchen(kitchen))
      }
      if (station){
         setstation(station);
         setcurrentstation(findCookingStation(kitchen,station))
          
        }
    },
    setTenantContext: function (tenant: string): void {
      //if (tenant) settenant(tenant);
    }
  }


  return <KoksmatContext.Provider value={koksmat}>

    {children}
    <div className="flex"><div className="p-2">
      Roles for {magicbox.session?.user?.email}:
    </div>
      {roles.map((role: RoleItem) => { return <div key={role.id} className="mx-2 rounded-lg bg-lime-300 p-2" >{role.name} </div> })}
    </div>

  </KoksmatContext.Provider>;
};
