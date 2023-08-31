"use client"
import { createContext } from "react";
export type  SharePointExtension= {
  token: string;
  settoken:(token:string)=>void
  parentlocation: string;
  setparentlocation:(token:string)=>void
}
export const SharePointExtensionContext = createContext<SharePointExtension>({
  token: "",
  settoken: function (token: string): void {
  
  },
  parentlocation: "",
  setparentlocation: function (token: string): void {
  
  }
});


