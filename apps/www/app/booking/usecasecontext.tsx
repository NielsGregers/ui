"use client"

import { createContext } from "react"

export type BookingUseCases = {
  /**
   * Create a new parking slot
   */
  CreateParkingSlot: (
    title: string,
    bookedBy: string,
    permanent: boolean
  ) => void
  DeleteParkingSlot: (id: string) => void
  BookParkingSlot: (
    dateKey: string,
    parkingSlot: string,
    userEmail: string
  ) => boolean
}
export const UsecaseContext = createContext<BookingUseCases>({
  CreateParkingSlot: () => {},
  DeleteParkingSlot: () => {},
  BookParkingSlot: function (
    dateKey: string,
    parkingSlot: string,
    userEmail: string
  ): boolean {
    throw new Error("Function not implemented.")
  },
})
