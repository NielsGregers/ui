"use client";

import { useEffect, useState } from "react";
import { MagicboxContextType, MagicboxContext, Session } from "./magicbox-context";
import { useSession } from "next-auth/react";


type Props = {
  children?: React.ReactNode;
};

export const MagicboxProvider = ({ children }: Props) => {

  const { data, status } = useSession()
  const [session, setsession] = useState<Session>()
  useEffect(() => {
    setsession(data as Session)
  
   
  }, [session,status])
  
  const magicbox: MagicboxContextType = {
    session 
  }
  return <MagicboxContext.Provider value={magicbox}>


    {children}


  </MagicboxContext.Provider>;
};
