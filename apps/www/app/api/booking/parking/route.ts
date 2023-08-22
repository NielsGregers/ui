// TODO: Check https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/?utm_content=cmp-true

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { connect, insert, remove } from "@/lib/mongodb"
import { de, fi } from "date-fns/locale"

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
  const x = await client.db("booking").collection("parking").insertOne(postBody)
  result = true
} catch (error) {

  debugger
    return false
}
finally{  
  client.close()
}

return result

  
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    )
  }

  await remove("booking", "parking", params.id)

  //  // const {data,error} = await provisionRoomServerSide(parseInt(params.sharepointid) )

  //   if (error){
  //     return new Response(error, {
  //       status: 500,
  //     })
  //   }

  //
}
