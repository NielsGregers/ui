"use client"
import { createContext } from "react";
import { Item, ItemGroup, Order } from "./data/schemas";
export type  Cava= {
  orders: Order[]
  items:Item[]
itemGroups:ItemGroup[]
}
export const CavaContext = createContext<Cava>({
  orders: [],items:[],itemGroups:[]
});


