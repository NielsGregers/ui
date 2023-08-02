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
  const agg = [
    {
      $match: {
        recipienttypedetails: "UserMailbox",
      },
    },
    {
      $addFields: {
        email: {
          $substr: [
            {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$emailaddresses",
                    cond: {
                      $regexMatch: {
                        input: "$$this",
                        regex: "^SMTP:",
                      },
                    },
                  },
                },
                0,
              ],
            },
            5,
            -1,
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        defaultmodel: 0,
        id: 0,
        guid: 0,
        recipienttypedetails: 0,
        emailaddresses: 0,
        distinguishedname: 0,
      },
    },
    {
      $sort: {
        email: 1,
      },
    },
  ]

  const client = await connect()
  const coll = client.db("christianiabpos").collection("recipients")
  const cursor = coll.aggregate(agg)
  const result = await cursor.toArray()
  // const users = JSON.parse(JSON.stringify(result)) as User[]

  const users = [
    {
      email: "karlo.mrakovcic@nexigroup.com",
      displayname: "Karlo Mrakovčić",
      alias: "kmrak",
    },
    {
      email: "niels.johansen@nexigroup.com",
      displayname: "Niels Johansen",
      alias: "ngjoh",
    },
  ]
  await client.close()

  return <NewParkingForm onSubmit={submit} users={users} />
}
