"use client"
import { createContext } from "react";


export type BookingContextProps = {
  something:string
  changeSomething:(changeTo:string)=>void
  roles:string[],
  setRoles:(roles:string[])=>void
}
export const BookingContext = createContext<BookingContextProps>({
  something: "234",
  setRoles(roles: string[]): void {
    throw new Error("Function not implemented.");
  },
  changeSomething: function (changeTo: string): void {
    throw new Error("Function not implemented.");
  },
  roles: []
})