/* eslint-disable turbo/no-undeclared-env-vars */

import { z } from "zod"

import { columns } from "./columns"
import { DataTable } from "./data-table"

import { schema } from "./schema"
import ToSmall from "@/components/tosmall"

import { connect } from "@/lib/mongodb"
import { use } from "react"


async function getItems() {



const filter = {};

const client = await connect(
  
);
const coll = client.db('christianiabpos').collection('newschannels');
const cursor = coll.find(filter);
const result = await cursor.toArray();
await client.close();

  return z.array(schema).parse(result)
}

export function RoomsTable() {
  // const data = use(getItems())
  const data = use(getItems())


  return (
    <>
      <ToSmall />
      <div className="hidden h-full flex-1 flex-col   md:flex">


        <DataTable data={data} columns={columns} />
      </div>
    </>
  )
}
