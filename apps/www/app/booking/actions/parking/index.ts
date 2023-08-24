import { boolean, string, z } from "zod"

import { UseCase } from "@/lib/usecase"

export namespace Admins {
  export async function newParkingSlot(
    title: string,
    bookedBy: string,
    permanent: boolean
  ) {
    const inputSchema = z.object({
      title: string(),
      bookedBy: string(),
      permanent: boolean(),
    })
    const outputSchema = z.object({ data: z.string() })
    return UseCase(
      "POST",
      "/api/booking/parking/",
      { title, bookedBy, permanent },
      inputSchema,
      outputSchema
    )
  }

  export async function deleteParkingSlot(id: string) {
    const inputSchema = z.object({
      id: string(),
    })
    const outputSchema = z.object({ data: z.boolean() })
    return UseCase(
      "DELETE",
      "/api/booking/parking/" + { id },
      { id },
      inputSchema,
      outputSchema
    )
  }

  export async function onServerAddParkingToDatabase(
    title: string,
    bookedBy: string,
    permanent: boolean
  ): Promise<{ data: string | undefined; error: Error }> {
    throw new Error("Not implemented")
  }
}

export async function newBookingParking(
  dateKey: string,
  parkingSlot: string,
  userEmail: string,
  plates: string
) {
  const inputSchema = z.object({
    dateKey: string(),
    parkingSlot: string(),
    userEmail: string(),
    plates: string(),
  })
  const outputSchema = z.object({ data: z.boolean() })
  return UseCase(
    "POST",
    "/api/booking/parking/*",
    { dateKey, parkingSlot, userEmail, plates },
    inputSchema,
    outputSchema
  )
}

export async function addLicencePlates(email: string, plates: string) {
  const inputSchema = z.object({
    email: string(),
    plates: string(),
  })
  const outputSchema = z.object({ data: z.boolean() })
  return UseCase(
    "POST",
    "/api/booking/users/plates",
    { email, plates },
    inputSchema,
    outputSchema
  )
}

