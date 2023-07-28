/* eslint-disable turbo/no-undeclared-env-vars */

import createClient from "openapi-fetch";
import { paths } from "./koksmat.api";

export async function authenticate(): Promise<{ token: string | undefined; }> {
  const { post } = createClient<paths>({
    baseUrl: process.env.KOKSMAT_HOST
  });

  const { data, error } = await post("/authorize", {
    next: { revalidate: 0 },
    body: {
      appkey: process.env.KOKSMAT_APPKEY,
    }
  });

  if (error) {
    return { token: undefined };
  } else return { token: data?.token };



}
