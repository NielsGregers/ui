import { redirect } from "next/navigation"
import { z } from "zod"

import { connect, insert } from "@/lib/mongodb"

import NewParkingForm, { schema } from "./NewParkingForm"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  permanent: z.boolean().default(false).optional(),
  bookedBy: z.string().optional(),
})

export type User = {
  alias: string
  email: string
  displayname: string
}

async function submit(values: schema) {
  "use server"

  // const fields = [...form]
  // const item: any = {}
  // fields.map((pair: any) => {
  //   item[pair[0]] = pair[1]
  // })

  // item.sessionId = randomUUID().toString()
  // var user = User.parse(item)

  await insert("booking", "parking", values)

  console.log(values)
  redirect("/booking/admin/parking/")
}

export default async function NewParking() {
 

  return <NewParkingForm onSubmit={submit} />
}
