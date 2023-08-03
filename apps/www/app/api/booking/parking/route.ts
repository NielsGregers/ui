// TODO: Check https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/?utm_content=cmp-true

import { provisionRoomServerSide } from "@/app/powershell/exchange/rooms/actions/provisionroom";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  
  ) {

    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(
        JSON.stringify({ status: "fail", message: "You are not logged in" }),
        { status: 401 }
      );
    }

    var b = request.body
    const error = "Not implemented"

   // const {data,error} = await provisionRoomServerSide(parseInt(params.sharepointid) )
    
    if (error){
      return new Response(error, {
        status: 500,
      })
    }

   //
    
}