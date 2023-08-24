import { NextResponse } from "next/server"
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
  let result = false
  try {
    const x = await client
      .db("booking")
      .collection("parking")
      .insertOne(postBody)
    result = true
  } catch (error) {
    debugger
    return false
  } finally {
    client.close()
  }

  return result
}
