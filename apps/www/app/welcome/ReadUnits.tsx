import createClient from "openapi-fetch";
import { paths } from "./data/schemas/magicbox.nets-intranets";

export async function ReadUnits() {
  const { get } = createClient<paths>({
    baseUrl: "https://magicbox.nets-intranets.com",
    // headers: {
    //   Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    // },
  });


  const { data, error } = await get("/v1/business/units", {
    cache: "no-cache",
  });
  return { units: data?.units, unitsError: error };

}
