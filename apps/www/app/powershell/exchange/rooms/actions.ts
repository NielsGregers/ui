
import { getClient } from "@/app/powershell/services/koksmat/getClient";
export type Error = {
  code?: number | undefined;
  context?: {
    [key: string]: unknown;
  } | undefined;
  error?: string | undefined;
  status?: string | undefined;
} | undefined

export async function provisionRoomServerSide(sharepointid: number): Promise<{ data: string | undefined, error: Error }> {
  const { client, token } = await getClient();
  const post = client.post;
  debugger
  const { data, error } = await post("/v1/rooms/sharepoint/provision", {
    body: { sharepointid },
  });
  debugger
  return { data, error };
}




export async function provisionRoom(id: number): Promise<{ data: any }> {
    const response = await fetch("/api/powershell/rooms/"+id+"/provision", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ sharepointid: id }), // body data type must match "Content-Type" header
    })

    const data = await response.json()
    return { data };
}