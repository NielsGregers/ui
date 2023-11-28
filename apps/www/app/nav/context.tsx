"use client"
import { Result } from "@/lib/httphelper";
import { AccountInfo } from "@azure/msal-browser";
import { createContext } from "react";


export type SecurityContextProps = {

  roles:string[],

  account: AccountInfo | null | undefined
  getToken(scopes:string[]):Promise<Result<string>>
  signIn():void
  signOut():void
}
export const SecurityContext = createContext<SecurityContextProps>({
  roles: [],
  account: undefined,
  getToken: function (scopes: string[]): Promise<Result<string>> {
    throw new Error("Function not implemented.");
  },
  signIn: function (): void {
    throw new Error("Function not implemented.");
  },
  signOut: function (): void {
    throw new Error("Function not implemented.");
  }
})
