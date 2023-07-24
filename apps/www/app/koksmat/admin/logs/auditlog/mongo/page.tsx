import React from "react"
import { aggregate } from "@/lib/mongodb"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table"

// This is important, if not set, this page will be statically generated causing the build to fail
// as the build process would need to have access to the database / api's
export const dynamic = 'force-dynamic' 


export const metadata = {
  title: 'Auditlog ',

}




export interface AuditLog {
  _id: string;
  created_at: Date;
  updated_at: Date;
  database: string;
  appid: string;
  subject: string;
  scriptname: string;

  input: string;

  haserror: boolean;

}

function hourminsecond(date: string) {
  if (!date) return ""
  return date.substring(11, 19)

}
export default async function KoksmatAdmin({ params }: { params: { type: string, date: string, hour: string } }) {



  const { date, hour, type } = params;
  const rawdata = await aggregate("magicbox", "audit_log",
    /** Insert pipeline under */
    [
      {
        '$sort': {
          'created_at': -1
        }
      }, {
        '$limit': 30
      }, {
        '$project': {
        
          'output': 0,
          'scriptsrc': 0,
          'console': 0
        }
      }
    ]
    /** end pipeline */
  )
  const data: AuditLog[] = rawdata
  // return <pre>

  // {JSON.stringify(data, null, 2)}

  // </pre>
  return <div>
    <Table>
      <TableCaption>A list of audit logs at {date} at hour {hour} </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Time</TableHead>
          <TableHead className="w-[100px]">Application</TableHead>
          <TableHead className="w-[100px]">Database</TableHead>
          <TableHead>Has error</TableHead>
          <TableHead>Script</TableHead>
          <TableHead>Parameters</TableHead>
          <TableHead className="text-right">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        {data?.map((item, id: number) => {
          return <TableRow key={id}>
            <TableCell> {item.created_at.toLocaleTimeString()}</TableCell>
            <TableCell> {item.appid}</TableCell>
            <TableCell> {item.database}</TableCell>
            <TableCell>{item.haserror ? "Has error" : ""}</TableCell>
            <TableCell>{item.scriptname}</TableCell>
            <TableCell>{item.input}</TableCell>
            <TableCell className="text-right"><a href={"/koksmat/admin/logs/auditlog/" + item._id} key={id}>Click to view </a></TableCell>
          </TableRow>



        })}
      </TableBody>
    </Table>




  </div>
}
