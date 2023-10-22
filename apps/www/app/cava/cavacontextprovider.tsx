"use client";

import { useContext, useEffect, useState } from "react";
import { CavaContext, Cava } from "./cavacontext";
import { MagicboxContext } from "../magicbox-context";
import { getCavaOrders } from "./[site]/data";
import { Item, ItemGroup, Order } from "./[site]/data/schemas";

import {

  useQuery,
} from '@tanstack/react-query'
type Props = {
  children?: React.ReactNode;
};

export const CavaProvider = ({ children }: Props) => {
  const magicbox = useContext(MagicboxContext)
  const [orders, setorders] = useState<Order[]>([])
  const [items, setitems] = useState<Item[]>([])
  const [itemGroups, setitemGroups] = useState<ItemGroup[]>([])
  useEffect(() => {
    const load = async () => {

      const token: string = magicbox.session?.accessToken ?? ""
      const { orders,items,itemGroups } = await getCavaOrders(token)
      setorders(orders)
      setitems(items)
      setitemGroups(itemGroups)
      
    }
    if (magicbox.session?.accessToken) load()
  }, [magicbox.session?.accessToken])
  const cava: Cava = {
    orders,items,itemGroups
  }
  return <CavaContext.Provider value={cava}>

    {children}


  </CavaContext.Provider>;
};
