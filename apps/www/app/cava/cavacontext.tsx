"use client"
import { createContext } from "react";
import { Order } from "./data/schemas";
export type  Cava= {
  orders: Order[]

}
export const CavaContext = createContext<Cava>({
  orders: []
});


