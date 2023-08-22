
import { MongoClient } from "mongodb";
import { connect } from "@/lib/mongodb";
import { Country, Unit } from "@/app/welcome/schema";
import { NewsChannel } from "../news/schema";
import { Countries } from "@/services/mongocollections/countries";
import { Units } from "@/services/mongocollections/units";
import { NewsChannels } from "@/services/mongocollections/newschannels";
import { channel } from "diagnostics_channel";

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
  const newsChannels = await getItems<NewsChannel,NewsChannels.Root>(client, { 'newschannel': 1 }, 'news_channels',
    (item: NewsChannels.Root) => {
      const channel: NewsChannel = {
        sortOrder: item.newschannel.title,
        channelName: item.newschannel.title,
        channelType: item.newschannel.newscategory.length > 0 ? item.newschannel.newscategory[0].lookupvalue : "",
        channelCode: item.newschannel.tag,
        RelevantUnits: item.newschannel.relevantunits.map(unit => {
          return {
            LookupId: unit.lookupid,
            LookupValue: unit.lookupvalue
          }
        }),
        Mandatory: item.newschannel.mandatory,
        RelevantCountires: item.newschannel.relevantcountires.map(country => {
          return {
            LookupId: country.lookupid,
            LookupValue: country.lookupvalue
          }
        }),
        Region: item.newschannel.region.length > 0 ? item.newschannel.region[0].lookupvalue :"",
        NewsCategory: item.newschannel.newscategory.length > 0 ? item.newschannel.newscategory[0].lookupvalue : ""
      }
      return channel

    })
  client.close()
  
  return { countries, units, newsChannels };



}

async function getItems<T,I>(client: MongoClient, projection: object, collection: string, mapper: (item: I) => T): Promise<T[]> {
  const filter = {};

  const coll = client.db('christianiabpos').collection(collection);
  const cursor = coll.find(filter, { projection });
  const items = await cursor.toArray()
  return items.map(item => mapper(item as I))
}

