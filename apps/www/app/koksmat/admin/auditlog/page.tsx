

import React from "react";
// npx openapi-typescript http://localhost:4322/shadcn/docs/admin/openapi.json --output admin.d.ts --useOptions --exportClient
import { components } from "../admin.api"; // (generated from openapi-typescript)
import Link from "next/link";
import { getClient } from "./getClient";
import { NOAPPKEY } from "./constants";
const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);


export default async function AuditLogEntries({
 
  searchParams, // if included, this page is considered to be a dynamic route, caching is done in data fetching
}: {
  
  searchParams: { [key: string]: string | string[] | undefined }
})  {
  if (searchParams.refresh){
    console.log("Refresh")
   
  }
  const { client, token } = await getClient();
  // happends under build in Docker if the env variable is not set
  // impact is that the page is not pre-rendered
  if (token === NOAPPKEY) {
    console.log("No app key defined")
    return null
  }
 
  const get = client.get


  const { data, error } = await get("/v1/admin/auditlogsummary", {
    next: { revalidate: 60 },
    params: {

    },
  });

  if (error) {
    console.log("Error", error)
    return <div>{error as string}</div>;
  }
  console.log("Number of records", data?.length)
  const results = groupBy(data, i => i.subject as string);
  const powershellLogentries = groupBy(results["powershell"], i => i.date as string);


  const dates = Object.keys(powershellLogentries).sort().reverse();
  return (
    <div>
      <div className="text-2xl">PowerShell</div>
      {


        dates.map((date, id) => {
          const hours = powershellLogentries[date].sort((a, b) => { return parseInt(a.hour as string) > parseInt(b.hour as string) ? 1 : -1 })

          return <div key={id}>
            <div className="text-xl">{date}</div>
            <div className="flex">
              {hours.map((item, id) => {
                return <LinktoPowerShellAuditLogHour key={id} item={item} />;
              })}</div>

          </div>;
        })}


    </div>
  );
}



function LinktoPowerShellAuditLogHour(props: { item: components["schemas"]["AuditAuditLogSum"] }) {
  return <div className="p-3">
    <a href={`/koksmat/admin/auditlog/subject/powershell/${props.item.date}/${props.item.hour}`}>
      <div>{props.item.hour}:00</div><div className="text-sm"> {props.item.count} records</div></a></div>;
}


 
