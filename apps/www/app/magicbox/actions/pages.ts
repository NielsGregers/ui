"use server"
/* eslint-disable turbo/no-undeclared-env-vars */
import { https } from "@/lib/httphelper";
import { authenticate } from "@/services/koksmat/authenticate";
import { DropdownMenuSubTrigger } from "@radix-ui/react-dropdown-menu";

export interface CopyPageResult {
  newpageurl: string
}


export async function copyPage(frompageurl: string, tositeurl: string) {

  const authResult = await authenticate()

  const accessToken = authResult.token ?? ""
  const endPoint = `${process.env.KOKSMAT_HOST}/v1/admin/sharepoint/copypage`

  const res = await https<CopyPageResult>(accessToken, "POST",
    endPoint, JSON.stringify({
    frompageurl, tositeurl
  }));
  return res

  //https<any>(accessToken, "POST",
}