
import { provisionRoomServerSide } from "@/app/powershell/exchange/rooms/actions";
import { NextResponse } from 'next/server'
 
export async function POST(
    request: Request,
    { params }: { params: { sharepointid: string } }
  ) {
    const id = parseInt(params.sharepointid) 

    await provisionRoomServerSide(id)
 
    return NextResponse.json(id)
}