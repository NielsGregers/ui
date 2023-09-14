"use server"

import { https, httpsGetAll, httpsGetPage } from "@/lib/httphelper";
import { connect } from "@/lib/mongodb";
import { getSpAuthToken } from "@/lib/officegraph"
import { User } from "lucide-react";
import { Db, FindOptions, MongoClient } from 'mongodb';



export interface Root {
  _id: Id
  eventdate: string
  id:string
  resource: string
  organizer: string
  changetype: string
  body: string
  location: string
  start: string
  end: string
  weblink:string
}

export interface Id {
  $oid: string
}


export interface EventCacheSummaryAggregation {
  eventdate: Date
  id:string
  resource: string
  organizer: string
  changetype: string
  body: string
  location: string
  start: Date
  end: Date
  weblink:string
  cavaid:string
}

export async function runEventCacheSummaryAggregation() {
  const agg = [
    {
      '$match': {
        'clientstate': 'room'
      }
    }, {
      '$addFields': {
        'newRoot': {
          'eventdate': '$created_at', 
          'resource': '$resourcedata.odataid', 
          'organizer': '$data.organizer.emailAddress.address', 
          'changetype': '$changetype', 
          'body': '$data.body.content', 
          'location': '$data.location.locationUri', 
          'start': '$data.start.dateTime', 
          'end': '$data.end.dateTime',
          'weblink' : '$data.webLink'
        }
      }
    }, {
      '$replaceRoot': {
        'newRoot': '$newRoot'
      }
    }, {
      '$out': 'cached_webhook_items_summary'
    }
  ];
  
  const client = await connect();
  const coll = client.db('christianiabpos').collection('cached_webhook_items');
  const cursor = coll.aggregate(agg);
  await cursor.toArray();
  const cached_webhook_items_summary = client.db('christianiabpos').collection<Root>('cached_webhook_items_summary');
 const cursor2 = cached_webhook_items_summary.find({},{limit:1000})
 const result = (await cursor2.toArray()).map(item => {
  let cavaid = ""
  const cavaPos1 = item.body.indexOf("https://cava.nets-intranets.com/?id=")
  if (cavaPos1 > -1) {
    const cavaPos2 = item.body.indexOf('"',cavaPos1+1)
    if (cavaPos2 > -1) {
       cavaid = item.body.substring(cavaPos1+36,cavaPos2)
       

    }
  }

      


  
  const v : EventCacheSummaryAggregation = {
   eventdate: new Date(item.eventdate),
    id:item.id,
    resource: item.resource,
    organizer: item.organizer,
    changetype: item.changetype,
    body: item.body,
    location: item.location,
    start: new Date(item.start),
    end: new Date(item.end),
    weblink: item.weblink,
    cavaid
  }
  return v
  })

  await client.close();
   return result
    
}