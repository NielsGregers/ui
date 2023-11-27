"use client"
import { Result } from "@/lib/httphelper";
import { AccountInfo } from "@azure/msal-browser";
import { createContext } from "react";


export type BookingContextProps = {
  something:string
  changeSomething:(changeTo:string)=>void
  roles:string[],
  setRoles:(roles:string[])=>void
  account: AccountInfo | null | undefined
  getToken(scopes:string[]):Promise<Result<string>>
}
export const BookingContext = createContext<BookingContextProps>({
  something: "234",
  setRoles(roles: string[]): void {
    throw new Error("Function not implemented.");
  },
  changeSomething: function (changeTo: string): void {
    throw new Error("Function not implemented.");
  },
  roles: [],
  account: undefined,
  getToken: function (scopes: string[]):  Promise<Result<string>> {
    throw new Error("Function not implemented.");
  }
})
