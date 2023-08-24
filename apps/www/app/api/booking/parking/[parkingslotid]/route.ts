// TODO: Check https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/?utm_content=cmp-true

import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { connect, insert, remove } from "@/lib/mongodb"
import { bookAnyAvailableParkingSlot } from "@/app/booking/actions/parking/bookAnyAvailableParkingSlot"

export async function POST(
  request: Request,
  { params }: { params: { parkingslotid: string } }
) {
  const postBody: any = await request.json()
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    )
  }

  const result = await bookAnyAvailableParkingSlot(
    postBody.dateKey,
    postBody.userEmail,
    postBody.plates
  )
  return result
}
export async function DELETE(
  request: Request,
  { params }: { params: { parkingslotid: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    )
  }

  const client = await connect()
  const coll = client.db("booking").collection("parking")
  let result

  try {
    await coll.findOneAndDelete({ _id: new ObjectId(params.parkingslotid) })
    result = true
  } catch (error) {
    result = false
  } finally {
    client.close()
  }
  return result

  //  // const {data,error} = await provisionRoomServerSide(parseInt(params.sharepointid) )

  //   if (error){
  //     return new Response(error, {
  //       status: 500,
  //     })
  //   }

  //   //
}
