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
import { RoomActions } from "./components/room-actions"

// This is important, if not set, this page will be statically generated causing the build to fail
// as the build process would need to have access to the database / api's
export const dynamic = 'force-dynamic'


export const metadata = {
  title: 'Rooms ',

}






export interface RoomObject {
  _id: Id;
  created_at: Createdat;
  updated_at: Createdat;
  canbeusedforreceptions?: any;
  capacity: number;
  ciscovideo?: any;
  deviceserialnumber?: any;
  email: string;
  id: number;
  id0: number;
  production?: any;
  provisioningstatus: string;
  restrictedto?: any;
  teamsmeetingroom?: any;
  title: string;
}

export interface Createdat {
  '$date': string;
}

export interface Id {
  '$oid': string;
}

function hourminsecond(date: string) {
  if (!date) return ""
  return date.substring(11, 19)

}
export default async function KoksmatAdmin({ params }: { params: { type: string, date: string, hour: string } }) {



  const { date, hour, type } = params;
  const rawdata = await aggregate("christianiabpos", "rooms",
    /** Insert pipeline under */
    [
      {
        '$project': {
          'pricelist': 0,
          'floor': 0,
          'building': 0,
          'location': 0,
          'country': 0,
          'metadata': 0
        }
      }, {
        '$sort': {
          'email': 1
        }
      }
    ]
    /** end pipeline */
  )

  const data: RoomObject[] = rawdata
  // return <pre>

  // {JSON.stringify(data, null, 2)}

  // </pre>
  return <div>
    <Table>
      <TableCaption>A list of Rooms </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead >Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        {data?.map((item, id: number) => {
          return <TableRow key={id}>
            <TableCell> {item.id}</TableCell>
            <TableCell> {item.title}</TableCell>
            <TableCell> {item.email}</TableCell>
            <TableCell> {item.provisioningstatus}</TableCell>
            <TableCell><RoomActions room={item} /></TableCell>
          </TableRow>



        })}
      </TableBody>
    </Table>




  </div>
}
