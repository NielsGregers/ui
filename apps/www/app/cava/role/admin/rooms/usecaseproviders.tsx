"use client";

import { useState } from "react";
import { UsecaseContext, RoomUseCases } from "./usecasecontext";
import { ProvisionRoomAction } from "./actions/provisionroom/component";
import { DeleteRoomAction } from "./actions/deleteroom/component";

type Props = {
  children?: React.ReactNode;
};

export const UsercaseProvider = ({ children }: Props) => {

  const [provision, setprovision] = useState(false);
  const [showDeleteComponent, setshowDeleteComponent] = useState(false);
  const [sharepointId, setSharepointId] = useState(0);
  const usecases: RoomUseCases = {

    ProvisionRoom: function (sharepointId: number): void {
      setSharepointId(sharepointId);
      setprovision(true);
    },
    DeleteRoom: function (sharepointId: number): void {
      setSharepointId(sharepointId);
      setshowDeleteComponent(true);
    }
  }
  return <UsecaseContext.Provider value={usecases}>
    {provision &&
      <ProvisionRoomAction sharepointId={sharepointId} onDone={() => setprovision(false)} />
    }
    {showDeleteComponent &&
      <DeleteRoomAction sharepointId={sharepointId} onDone={() => setshowDeleteComponent(false)} />
    }

    {children}


  </UsecaseContext.Provider>;
};
