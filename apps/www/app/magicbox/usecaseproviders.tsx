"use client";

import { useState } from "react";
import { SharePointExtension, SharePointExtensionContext } from "./usecasecontext";


type Props = {
  children?: React.ReactNode;
};

export const UsercaseProvider = ({ children }: Props) => {
const [token, settoken] = useState("")
const [parentlocation, setparentlocation] = useState("")
  const usecases: SharePointExtension = {
    token,settoken,parentlocation,setparentlocation
  }
  return <SharePointExtensionContext.Provider value={usecases}>


    {children}


  </SharePointExtensionContext.Provider>;
};
