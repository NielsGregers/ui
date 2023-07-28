import { promises as fs } from "fs"
import path from "path"

import { z } from "zod"

import { columns } from "./columns"
import { DataTable } from "./data-table"

import { schema } from "./schema"
import ToSmall from "@/components/tosmall"

import { connect } from "@/lib/mongodb"
import { Sort } from "mongodb"
import { use } from "react"


async function getItems() {


  /*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$project': {
      'email': 1, 
      'capacity': 1, 
      'title': 1, 
      'provisioningstatus': 1, 
      'id': 1, 
      'created_at': 1, 
      'updated_at': 1, 
      'deviceserialnumber': 1, 
      'ciscovideo': 1, 
      'restrictedto': 1, 
      'teamsmeetingroom': 1, 
      'production': 1
    }
  }, {
    '$sort': {
      'title': 1
    }
  }
];

const client = await connect()
 
const coll = client.db('christianiabpos').collection('rooms');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();

  return z.array(schema).parse(result)
}

export  function RoomsTable() {
  const data = use( getItems())

  return (
    <>
      <ToSmall />
      <div className="hidden h-full flex-1 flex-col   md:flex">

        <DataTable data={data} columns={columns} />
      </div>
    </>
  )
}
