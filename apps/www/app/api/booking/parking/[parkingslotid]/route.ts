// TODO: Check https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/?utm_content=cmp-true

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { insert, remove } from "@/lib/mongodb"
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
    postBody.userEmail
  )
  return result
}
// export async function DELETE(
//   request: Request,
//   { params }: { params: { parkingslotid: string } }
// ) {
//   const session = await getServerSession(authOptions)
//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ status: "fail", message: "You are not logged in" }),
//       { status: 401 }
//     )
//   }

//   await remove("booking", "parking", params.id)

//   //  // const {data,error} = await provisionRoomServerSide(parseInt(params.sharepointid) )

//   //   if (error){
//   //     return new Response(error, {
//   //       status: 500,
//   //     })
//   //   }

//   //
// }