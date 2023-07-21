import React from "react";

import createClient from "openapi-fetch";
import { paths } from "./data/schemas/magicbox.nets-intranets"; // (generated from openapi-typescript)
import IntranetCountry from "./showcountry";

export default async function Intranet() {
  const countries = await Countries();
  const units = await Units();
  return (
    <div>
      <div>{countries}</div>
      <div>{units}</div>
    </div>
  );
}

 async function Countries() {
  const { get } = createClient<paths>({
    baseUrl: "https://magicbox.nets-intranets.com",
    // headers: {
    //   Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    // },
  });

  const { data, error } = await get("/v1/business/countries", {
    cache: "no-cache",
  });

  if (error) {
    return <div>{error.code}</div>;
  }
  return (
    <div>
      
        Hello world
        {data?.countries?.map((country, id) => {
          return <IntranetCountry key={id} name={country.Name} code="cc" />;
        })}
      
    </div>
  );
}

 async function Units() {
  const { get } = createClient<paths>({
    baseUrl: "https://magicbox.nets-intranets.com",
    // headers: {
    //   Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    // },
  });

  const { data, error } = await get("/v1/business/units", {
    cache: "no-cache",
  });

  if (error) {
    return <div>{error.code}</div>;
  }
  return (
    <div>
     
        Units
        {data?.units?.map((unit, id) => {
          return <IntranetCountry key={id} name={unit.name} code="cc" />;
        })}
     
    </div>
  );
}
