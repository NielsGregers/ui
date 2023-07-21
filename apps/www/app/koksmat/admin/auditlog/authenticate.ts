/* eslint-disable turbo/no-undeclared-env-vars */

import createClient from "openapi-fetch";
import { paths } from "../admin.api";
import { NOAPPKEY } from "./constants";

export async function authenticate(): Promise<{ token: string | undefined; }> {
  const { post } = createClient<paths>({
    baseUrl: process.env.KOKSMAT_HOST
  });
  if (!process.env.KOKSMAT_APPKEY) {
    return { token: NOAPPKEY };
  }
  const { data, error } = await post("/authorize", {
    next: { revalidate: 300 },
    body: {
      appkey: process.env.KOKSMAT_APPKEY,
    }
  });

  if (error) {
    return { token: undefined };
  } else return { token: data?.token };



}
