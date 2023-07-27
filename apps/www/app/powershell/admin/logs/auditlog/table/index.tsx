import { promises as fs } from "fs"
import path from "path"

import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

import { schema } from "./data/schema"
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
    '$sort': {
      'created_at': -1
    }
  }, {
    '$match': {
      'subject': 'powershell'
    }
  }, {
    '$limit': 1000
  }, {
    '$project': {
      'output': 0, 
      'scriptsrc': 0, 
      'console': 0
    }
  }, {
    '$addFields': {
      'id': {
        '$toString': '$_id'
      }
    }
  }
]

const client = await connect();
const coll = client.db('magicbox').collection('audit_log');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
  return z.array(schema).parse(result)
}

export  function AuditLogsTable() {
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
