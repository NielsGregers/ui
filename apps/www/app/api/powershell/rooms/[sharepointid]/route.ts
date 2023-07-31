
import { deleteRoomServerSide } from "@/app/powershell/exchange/rooms/actions/deleteroom";


 
export async function DELETE(
  request: Request,
  { params }: { params: { sharepointid: string } }
  ) {
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