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
import { Document } from "mongodb"

async function getItems(database:string,collection:string,agg: Document[]) {


/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */




const client = await connect();
const coll = client.db(database).collection(collection);
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
  return z.array(schema).parse(result)
}

export  function GenericTable(params :  {

  database:string,
  collection:string,
  agg: Document[] ,
  linkPrefix: string
  }
) {
  const data = use( getItems(params.database,params.collection,params.agg))

  return (
    <>
      <ToSmall />
      <div className="hidden h-full flex-1 flex-col   md:flex">

        <DataTable data={data} columns={columns} />
      </div>
    </>
  )
}
