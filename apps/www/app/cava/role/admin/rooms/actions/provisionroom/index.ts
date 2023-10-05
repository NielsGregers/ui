
import { getClient, Error } from "@/services/koksmat/getClient";
import { UseCase } from "@/lib/usecase";
import { z } from "zod";


/**
 * Client side stub for provisioning a room
 * @param id 
 * @returns 
 */
export async function action(id: number) {
  const inputSchema = z.object({})
  const outputSchema = z.object({email:z.string().email()})
  return UseCase("POST", "/api/powershell/rooms/" + id + "/provision", {}, inputSchema, outputSchema)
}

/**
 * Server side stub for provisioning a room
 * @param sharepointid 
 * @returns 
 */

export async function provisionRoomServerSide(sharepointid: number): Promise<{ data: string | undefined, error: Error }> {
  const { client, token } = await getClient();
  const post = client.post;
  const requestResponse = await post("/v1/rooms/sharepoint/provision", {
    body: { sharepointid },
  });
  
  return { data:requestResponse.data?.email, error: requestResponse.error };
}

