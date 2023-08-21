"use client"

import { Admins, newBookingParking } from "./actions/parking"
import { BookingUseCases, UsecaseContext } from "./usecasecontext"

type Props = {
  children?: React.ReactNode
}

export const UsercaseProvider = ({ children }: Props) => {
  const usecases: BookingUseCases = {
    CreateParkingSlot: function (
      title: string,
      bookedBy: string,
      permanent: boolean
    ): void {
      Admins.newParkingSlot(title, bookedBy, permanent)
    },
    DeleteParkingSlot: function (id: string): void {
      Admins.deleteParkingSlot(id)
    },
    BookParkingSlot: function (
      dateKey: string,
      parkingSlot: string,
      userEmail: string
    ) {
      newBookingParking(dateKey, parkingSlot, userEmail)
      return true
    },
  }

  return (
    <UsecaseContext.Provider value={usecases}>
      {children}
    </UsecaseContext.Provider>
  )
}
