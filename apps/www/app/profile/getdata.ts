/* eslint-disable turbo/no-undeclared-env-vars */
"use server"

import { MongoClient } from "mongodb";
import { connect } from "@/lib/mongodb";
import { Country, Unit } from "./schemas/welcome";
import { NewsChannel } from "./schemas/NewsChannelSchema";
import { Countries } from "@/services/mongo/countries";
import { Units } from "@/services/mongo/units";
import { NewsChannels } from "@/services/mongo/newschannels";


export async function getProfilingData() {
  const client = await connect()
  
  const countries = await getItems<Country,Countries.Root>(client, { 'countrydata': 1 }, 'countries',
    (item: Countries.Root) => {
      const country: Country = {
        countryCode: item.countrydata.code,
        countryName: item.countrydata.title,
        sortOrder: item.countrydata.sortorder,
      }
      return country
    }
  )
  const units = await getItems<Unit,Units.Root>(client, { 'unitdata': 1 }, 'units',
    (item: Units.Root) => {
      const u: Unit = {
        unitCode: item.unitdata.title,
        unitName: item.unitdata.title,
        unitType: item.unitdata.unittype,
        sortOrder: item.unitdata.sortorder,
      }
      return u
    })
  const newsChannels = await getItems<NewsChannel,NewsChannels.Newschannel>(client, {  }, 'newschannels',
  
    (item: NewsChannels.Newschannel) => {
      
      const channel: NewsChannel = {
        sortOrder: item.title,
        channelName: item.title,
        channelType: item.newscategory.length > 0 ? item.newscategory[0].lookupvalue : "",
        channelCode: item.tag,
        RelevantUnits: item.relevantunits.map(unit => {
          return {
            LookupId: unit.lookupid,
            LookupValue: unit.lookupvalue
          }
        }),
        Mandatory: item.mandatory,
        RelevantCountires: item.relevantcountires.map(country => {
          return {
            LookupId: country.lookupid,
            LookupValue: country.lookupvalue
          }
        }),
        Region: item.region.length > 0 ? item.region[0].lookupvalue :"",
        NewsCategory: item.newscategory.length > 0 ? item.newscategory[0].lookupvalue : ""
      }
      return channel

    })
  client.close()
  
  return { countries, units, newsChannels };



}

async function getItems<T,I>(client: MongoClient, projection: object, collection: string, mapper: (item: I) => T): Promise<T[]> {
  const filter = {};

  const coll = client.db(process.env.DATABASE).collection(collection);
  const cursor = coll.find(filter, { projection });
  const items = await cursor.toArray()
  return items.map(item => mapper(item as I))
}

