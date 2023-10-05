/* eslint-disable turbo/no-undeclared-env-vars */

import { z } from "zod"

import { columns } from "./columns"
import { DataTable } from "./data-table"

import { schema } from "../schema"
import ToSmall from "@/components/tosmall"

import { connect } from "@/lib/mongodb"
import { use } from "react"

import { getToken, getRootSite, getSubSite, getAllListItems } from "@/lib/officegraph"

async function getGraphItems() {
  const token = await getToken(process.env.SPAUTH_TENANTID as string, process.env.SPAUTH_CLIENTID as string, process.env.SPAUTH_CLIENTSECRET as string)
  const rootSiteResponse = await getRootSite(token)
  const subSiteResponse = await getSubSite(token, rootSiteResponse.data?.siteCollection.hostname as string, "sites/cava3")

  const { data, hasError, errorMessage } = await getAllListItems(token, subSiteResponse.data?.id as string, "Rooms")
  if (hasError) {

    console.log(errorMessage)

  }
  
  const items = data?.map((item: any) => {
    return {
      id: parseInt(item.fields.id),
      title: item.fields.Title,
      email: item.fields.Email ? item.fields.Email : "",
      capacity: item.fields.Capacity,
      provisioningstatus: item.fields.Provisioning_x0020_Status,
      created_at:  new Date(item.fields.Created),
      updated_at: new Date(item.fields.Modified),
      deviceserialnumber: "", //item.fields.DeviceSerialNumber,
      ciscovideo: item.fields.CiscoVideo ? true : false,
      restrictedto: item.fields.RestrictedTo ? item.fields.RestrictedTo : "",
      teamsmeetingroom: item.fields.TeamsMeetingRoom ? true : false,
      production:item.fields.Production ? true : false
    }
  })

  return z.array(schema).parse(items)
}
async function getItems() {


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

export function RoomsTable() {
  // const data = use(getItems())
  const data = use(getGraphItems())


  return (
    <>
      <ToSmall />
      <div className="hidden h-full flex-1 flex-col   md:flex">


        <DataTable data={data} columns={columns} />
      </div>
    </>
  )
}
