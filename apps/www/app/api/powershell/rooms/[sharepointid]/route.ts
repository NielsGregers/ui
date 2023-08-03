
import { deleteRoomServerSide } from "@/app/powershell/exchange/rooms/actions/deleteroom";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


 
export async function DELETE(
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
    const {data,error} = await deleteRoomServerSide(parseInt(params.sharepointid) )
    
    if (error){
      return new Response(error.error, {
        status: 500,
      })
    }

    return new Response(JSON.stringify({email:data}), {
      status: 200}
    )
    
}