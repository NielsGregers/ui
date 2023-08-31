"use client";

import { useContext, useEffect, useState } from "react";
import { CavaContext, Cava } from "./cavacontext";
import { MagicboxContext } from "../magicbox-context";
import { getCavaOrders } from "./data";
import { Order } from "./data/schemas";


type Props = {
  children?: React.ReactNode;
};

export const CavaProvider = ({ children }: Props) => {
  const magicbox = useContext(MagicboxContext)
  const [orders, setorders] = useState<Order[]>([])

  useEffect(() => {
    const load = async () => {

      const token: string = magicbox.session?.accessToken ?? ""
      const { orders } = await getCavaOrders(token)
      setorders(orders)
    }
    if (magicbox.session?.accessToken) load()
  }, [magicbox.session?.accessToken])
  const cava: Cava = {
    orders
  }
  return <CavaContext.Provider value={cava}>

    {children}


  </CavaContext.Provider>;
};
