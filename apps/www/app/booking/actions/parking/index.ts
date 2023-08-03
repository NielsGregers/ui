
import { UseCase } from "@/lib/usecase";
import { z } from "zod";

export namespace Admins {
export async function newParkingSlot(title:string,bookedBy:string,permanent: boolean) {
  const inputSchema = z.object({})
  const outputSchema = z.object({email:z.string().email()})
  return UseCase("POST", "/api/booking/parking/", {title,bookedBy,permanent}, inputSchema, outputSchema)
}


export async function onServerAddParkingToDatabase(title:string,bookedBy:string,permanent: boolean): Promise<{ data: string | undefined, error: Error }> {

  throw new Error("Not implemented")
}

}
