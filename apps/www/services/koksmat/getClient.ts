/* eslint-disable turbo/no-undeclared-env-vars */
import createClient from "openapi-fetch";
import { paths } from "./koksmat.api";
import { authenticate } from "./authenticate";

// npx openapi-typescript http://localhost:4322/shadcn/docs/admin/openapi.json --output admin.d.ts --useOptions --exportClient

export type Error = {
  code?: number | undefined;
  context?: {
    [key: string]: unknown;
  } | undefined;
  error?: string | undefined;
  status?: string | undefined;
} | undefined
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
