"use client"
import { createContext } from "react";
import { Item, ItemGroup, Order } from "./data/schemas";
export interface RoleItem {
  name: string
  key: string
  id: string

}

export type Koksmat = {
  roles: RoleItem[]
  orders: Order[]
  items: Item[]
  itemGroups: ItemGroup[],
  isloaded: boolean,
  hasRole:  (role: string) => boolean
}
export const KoksmatContext = createContext<Koksmat>({
  orders: [], items: [], itemGroups: [], roles: [], isloaded: false,
  hasRole: function (role: string):  boolean {
    return false
  }
});


