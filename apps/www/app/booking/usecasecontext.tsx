"use client"
import { createContext } from "react";
export type  BookingUseCases= {

  /**
   * Create a new parking slot
  */
  CreateParkingSlot: (title:string,bookedBy:string,permanent: boolean) => void;


}
export const UsecaseContext = createContext<BookingUseCases>({CreateParkingSlot:()=>{}});


