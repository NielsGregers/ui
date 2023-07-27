import { getClient } from "@/app/powershell/services/koksmat/getClient";
export type Error = {
  code?: number | undefined;
  context?: {
      [key: string]: unknown;
  } | undefined;
  error?: string | undefined;
  status?: string | undefined;
} | undefined

export async function provisionRoom(sharepointid: number) : Promise<{ data: string | undefined, error: Error}> {
  const { client, token } = await getClient();
  const post = client.post;

  const { data, error } = await post("/v1/rooms/sharepoint/provision", {
    body: { sharepointid },
  });
  return { data , error };
}
