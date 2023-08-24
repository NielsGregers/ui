import { NextResponse } from "next/server"
import { de, fi } from "date-fns/locale"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { connect, insert, remove } from "@/lib/mongodb"

export async function POST(request: Request) {
  const postBody = await request.json()
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    )
  }

  const client = await connect()
  const coll = client.db("booking").collection("users")
  const cursor = coll.find({ upn: postBody.email })
  const result = await cursor.toArray()
  if (result.length <= 0) {
    //create a user with a new licence plate
    await coll.insertOne({
      upn: postBody.email,
      licenceplates: [postBody.plates],
    })
  } else {
    //add licence plate to an existing user
    const _id = result[0]._id
    await coll.updateOne({ _id }, { $push: { licenceplates: postBody.plates } })
  }
  client.close()

  return true
}
