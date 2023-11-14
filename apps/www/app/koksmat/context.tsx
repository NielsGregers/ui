"use client"
import { createContext } from "react";
import { CookingStation, Kitchen } from "./[site]/kitchen";

export interface RoleItem {
  name: string
  key: string
  id: string

}

export type KoksmatContextProps = {
  roles: RoleItem[]
  isloaded: boolean,
  domain:string,
  tenant:string,
  site:string,
  kitchen?:string,
  station?:string
  currentKitchen?: Kitchen,
  currentstation?: CookingStation,
  showToolbar?:boolean,
  hasRole:  (role: string) => boolean
  setSiteContext:(tenant:string,site:string)=>void
  setTenantContext:(tenant:string)=>void
  setKitchenContext:(kitchen:string)=>void
  setStationContext:(kitchen:string,station:string)=>void
}
export const KoksmatContext = createContext<KoksmatContextProps>({
  roles: [], isloaded: false, tenant: "", site: "",
  hasRole: function (role: string): boolean {
    throw new Error("Function not implemented.");
  },
  setSiteContext: function (tenant: string, site: string): void {
    throw new Error("Function not implemented.");
  },
  setKitchenContext: function (kitchen: string): void {
    throw new Error("Function not implemented.");
  },
  setStationContext: function (kitchen: string, station: string): void {
    throw new Error("Function not implemented.");
  },
  currentKitchen: undefined,
  setTenantContext: function (tenant: string): void {
    throw new Error("Function not implemented.");
  },
  domain: ""
})
