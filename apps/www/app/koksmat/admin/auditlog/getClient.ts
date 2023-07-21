/* eslint-disable turbo/no-undeclared-env-vars */
import createClient from "openapi-fetch";
import { paths } from "../admin.api";
import { authenticate } from "./authenticate";



export async function getClient() {
  const { token } = await authenticate();
  const client = createClient<paths>({
    baseUrl: process.env.KOKSMAT_HOST,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    client, token
  };
}
