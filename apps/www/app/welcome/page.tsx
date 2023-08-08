import React from "react";

import ShowCountries from "./components/selectcountryandunit";


import { cookies } from "next/headers";
import { getToken, getRootSite, getSubSite, getAllItems } from "@/lib/officegraph"
import { Countries,Units } from "@/services/sharepoint/nexiintra-home/sharepoint"
import { z } from "zod"
import { Country,Unit } from "./schema"


export const dynamic = 'force-dynamic'

async function getGraphItems() {
  const token = await getToken(process.env.SPAUTH_TENANTID as string, process.env.SPAUTH_CLIENTID as string, process.env.SPAUTH_CLIENTSECRET as string)
  const rootSiteResponse = await getRootSite(token)
  const subSiteResponse = await getSubSite(token, rootSiteResponse.data?.siteCollection.hostname as string, "sites/nexiintra-home")

  const countries = await getCountries();
  const units = await getUnits();
  return {countries,units}


  async function getCountries() {
    const { data, hasError, errorMessage } = await getAllItems(token, subSiteResponse.data?.id as string, Countries.listName);
    if (hasError) {
      console.log(errorMessage);
    }

    const items = data?.map((item: any) => {
      return Countries.map(item);

    });
    const spItems = z.array(Countries.schema).parse(items);

    const countries = spItems.map((item) => {
      const i: Country = {
        countryName: item.Title,
        countryCode: item.Code,
        sortOrder: item.SortOrder,
      };
      return i;
    });
    return countries;
  }


async function getUnits() {
  const { data, hasError, errorMessage } = await getAllItems(token, subSiteResponse.data?.id as string, Units.listName);
  if (hasError) {
    console.log(errorMessage);
  }

  const items = data?.map((item: any) => {
    return Units.map(item);

  });
  const spItems = z.array(Units.schema).parse(items);

  const units = spItems.map((item) => {
    const i: Unit = {
      unitName: item.Title,
      unitCode: item.code,
      sortOrder: item.SortOrder,
    };
    return i;
  });
  return units;
}
}
export default async function Intranet() {

  const { countries, units } = await getGraphItems();

  const data = cookies().has("user") ? JSON.parse(cookies().get("user")?.value as string ) : {}



  return (
    <div>
      <div>
        <ShowCountries countries={countries } units={units} currentCountry={data.country} currentUnit={data.unit} />
      </div>

     

    </div>
  );
}




