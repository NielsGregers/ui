import React from "react";

import ShowCountries from "./components/selectcountryandunit";

import { ReadCountries } from "./ReadCountries";
import { ReadUnits } from "./ReadUnits";
import Status from "./components/status";
import { cookies } from "next/headers";


export default async function Intranet() {

  const { countries, countryError } = await ReadCountries();
  const { units, unitsError } = await ReadUnits();

  if (countryError || unitsError) {
    console.log("countryError", countryError)
    console.log("unitsError", unitsError)

    return <div>error</div>
  }
  const data = cookies().has("user") ? JSON.parse(cookies().get("user")?.value as string ) : {}




  return (
    <div>
      <div>
        <ShowCountries countries={countries as any[]} units={units as any[]} currentCountry={data.country} currentUnit={data.unit} />
      </div>

     

    </div>
  );
}




