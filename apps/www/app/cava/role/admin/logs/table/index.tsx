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

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {
  'subject': 'powershell'
};
const projection = {
  'scriptsrc': 0, 
  'output': 0, 
  'console': 0
};
const sort : Sort = {
  'created_at': -1
};
const limit = 1000;

const client = await connect();
const coll = client.db('magicbox').collection('audit_log');
const cursor = coll.find(filter, { projection, sort, limit });
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
