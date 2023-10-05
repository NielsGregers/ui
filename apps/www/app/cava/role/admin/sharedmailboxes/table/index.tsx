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


  const filter = {

  };
  const projection = {
    primarysmtpaddress: 1,
    displayname: 1,
    owners: 1,
    exchangeobjectid: 1
  };
  const sort: Sort = {
    'primarysmtpaddress': 1
  };
  const skip = 0;
  const limit = 10000;

  const client = await connect()
  const coll = client.db('christianiabpos').collection('shared_mailboxes');
  const cursor = coll.find(filter, { projection, sort, skip, limit });
  const items = await cursor.toArray();
  await client.close();


  return z.array(schema).parse(items)
}

export  function SharedMailboxesTable() {
  const tasks = use( getItems())

  return (
    <>
      <ToSmall />
      <div className="hidden h-full flex-1 flex-col   md:flex">

        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
