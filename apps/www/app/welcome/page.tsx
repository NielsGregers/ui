import React from "react";
import SelectCountryAndUnit from "./components/selectcountryandunit-client";
import { cookies } from "next/headers";
import { getProfilingData } from "./getdata";

export const dynamic = 'force-dynamic'

export default async function Intranet() {

  const { countries, units } = await getProfilingData();

  const data = cookies().has("user") ? JSON.parse(cookies().get("user")?.value as string) : {}



  return (

    <SelectCountryAndUnit countries={countries} units={units} currentCountry={data.country} currentUnit={data.unit} />

  );
}




