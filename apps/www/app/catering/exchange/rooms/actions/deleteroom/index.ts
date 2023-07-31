
import { getClient, Error } from "@/app/powershell/services/koksmat/getClient";
import { UseCase } from "@/lib/usecase";
import { z } from "zod";


/**
 * Client side stub for provisioning a room
 * @param id 
 * @returns 
 */
export async function action(id: number) {
  const inputSchema = z.object({})
  const outputSchema = z.string().nullable()
  return UseCase("DELETE", "/api/powershell/rooms/" + id + "/delete", {}, inputSchema, outputSchema)
}

/**
 * Server side stub for provisioning a room
 * @param sharepointid 
 * @returns 
 */

export async function deleteRoomServerSide(sharepointid: number): Promise<{ data: string | undefined, error: Error }> {
  const { client, token } = await getClient();
  const del = client.del;
  
  const requestResponse = await del("/v1/rooms/sharepoint/{sharepointitemid}",{params: {path:{sharepointitemid:sharepointid}}}
  );
  
  return { data:"", error: requestResponse.error };
}

