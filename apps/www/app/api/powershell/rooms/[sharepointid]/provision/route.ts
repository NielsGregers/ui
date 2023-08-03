// TODO: Check https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/?utm_content=cmp-true

import { provisionRoomServerSide } from "@/app/powershell/exchange/rooms/actions/provisionroom";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { sharepointid: string } }
  ) {

    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(
        JSON.stringify({ status: "fail", message: "You are not logged in" }),
        { status: 401 }
      );
    }

    const {data,error} = await provisionRoomServerSide(parseInt(params.sharepointid) )
    
    if (error){
      return new Response(error.error, {
        status: 500,
      })
    }

    return new Response(JSON.stringify({email:data}), {
      status: 200}
    )
    
}