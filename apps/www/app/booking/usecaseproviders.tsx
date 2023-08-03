"use client";

import { useState } from "react";
import { UsecaseContext, BookingUseCases } from "./usecasecontext";
import { Admins } from "./actions/parking";


type Props = {
  children?: React.ReactNode;
};

export const UsercaseProvider = ({ children }: Props) => {

  const [provision, setprovision] = useState(false);
  const [showDeleteComponent, setshowDeleteComponent] = useState(false);
  const [sharepointId, setSharepointId] = useState(0);
  const usecases: BookingUseCases = {
    CreateParkingSlot: function (title: string, bookedBy: string, permanent: boolean): void {
      Admins.newParkingSlot(title, bookedBy, permanent);
    }
  }

  
  return <UsecaseContext.Provider value={usecases}>


    {children}


  </UsecaseContext.Provider>;
};
