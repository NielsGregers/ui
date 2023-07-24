import React from "react"
import { NOAPPKEY } from "../../../../constants";
import { getClient } from "../../../../getClient";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table"




export const metadata = {
  title: 'Auditlog ',

}

function hourminsecond(date: string ) {
  if (!date) return ""
  return date.substring(11,19)

}
export default async function KoksmatAdmin({ params }: { params: { type: string, date: string, hour: string } }) {
  const { client, token } = await getClient();
  // happends under build in Docker if the env variable is not set
  // impact is that the page is not pre-rendered
  if (token === NOAPPKEY) {
    return null
  }
  const get = client.get
  const { date, hour, type } = params;


  const { data, error } = await get("/v1/admin/auditlogs/date/{date}/{hour}", {
    next: { revalidate: 60 },
    params: {
      path: {
        date,
        hour,
      }
    },
  });

  if (error) {
    return <div>{error as string}</div>;
  }
  return <div>
<Table>
  <TableCaption>A list of audit logs at {date} at hour {hour} </TableCaption>
  <TableHeader>
    <TableRow>
    <TableHead className="w-[100px]">Time</TableHead>
      <TableHead className="w-[100px]">Application</TableHead>
      <TableHead>Has error</TableHead>
      <TableHead>Script</TableHead>
      <TableHead className="text-right">Details</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    
    {data?.auditlogs?.map((item, id) => {
      return <TableRow key={id}>
          <TableCell> {hourminsecond(item.created_at as string)}</TableCell>
      <TableCell> {item.appid}</TableCell>
      <TableCell>{item.haserror ? "Has error":""}</TableCell>
      <TableCell>{item.scriptname}</TableCell>
      <TableCell className="text-right"><a href={"/powershell/admin/auditlog/" + item.id} key={id}>Click to view </a></TableCell>
    </TableRow>
      
      
    
    })}
  </TableBody>
</Table>


 

  </div>
}
