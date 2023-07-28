import React from "react"
import { GenericTable } from "@/app/powershell/components/table"
import { connect } from "@/lib/mongodb"
import { Sort } from "mongodb"

// This is important, if not set, this page will be statically generated causing the build to fail
// as the build process would need to have access to the database / api's
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Users ',
}

export default async function AccessControl() {
  const filter = {};
  const sort: Sort = {
    'upn': 1
  };

  const client = await connect()
  const coll = client.db('magicbox').collection('user');
  const cursor = coll.find(filter, { sort });
  const result = await cursor.toArray();
  await client.close();
  const data = result.map((item) => {
    var i = {...item}
    i.title = item.upn
    i.link = `/powershell/admin/accesscontrol/${item.upn}`
    i.details = item.displayname 
    i.id = item._id
    return i
    
  })
  return <GenericTable data={data}  />
}
