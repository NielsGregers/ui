import { getToken, getRootSite, getSubSite, getAllListItems } from "@/lib/officegraph";
import { Countries, NewsChannels, Units } from "@/services/sharepoint/nexiintra-home/sharepoint";
import { z } from "zod";
import { Country, Unit } from "./schema";
import { NewsChannel } from "../news/schema";


export async function getProfilingData() {
  const token = await getToken(process.env.SPAUTH_TENANTID as string, process.env.SPAUTH_CLIENTID as string, process.env.SPAUTH_CLIENTSECRET as string);
  const rootSiteResponse = await getRootSite(token);
  const subSiteResponse = await getSubSite(token, rootSiteResponse.data?.siteCollection.hostname as string, "sites/nexiintra-home");

  const countries = await getCountries();
  const units = await getUnits();
  const newsChannels = await getNewsChannels();
  return { countries, units,newsChannels };




  async function getCountries(): Promise<Country[]> {
    const { data, hasError, errorMessage } = await getAllListItems(token, subSiteResponse.data?.id as string, Countries.listName);
    if (hasError) {
      console.log(errorMessage);
    }

    const items = data?.map((item: any) => {
      return Countries.map(item);

    });
    const spItems = z.array(Countries.schema).parse(items);

    const countries = spItems.map((item) => {
      const i: Country = {
        countryName: item.Title,
        countryCode: item.Code,
        sortOrder: item.SortOrder,
      };
      return i;
    });
    return countries;
  }




  async function getUnits(): Promise<Unit[]> {
    const { data, hasError, errorMessage } = await getAllListItems(token, subSiteResponse.data?.id as string, Units.listName);
    if (hasError) {
      console.log(errorMessage);
    }

    const items = data?.map((item: any) => {
      return Units.map(item);

    });
    const spItems = z.array(Units.schema).parse(items);

    const units = spItems.map((item) => {
      const i: Unit = {
        unitName: item.Title,
        unitCode: item.code,
        sortOrder: item.SortOrder,
        unitType:item.UnitType ?? ""
      };
      return i;
    });
    return units;
  }

  async function getNewsChannels(): Promise<NewsChannel[]> {
    return []
    // const { data, hasError, errorMessage } = await getAllListItems(token, subSiteResponse.data?.id as string, NewsChannels.listName);
    // if (hasError) {
    //   console.log(errorMessage);
    // }

    // const items = data?.map((item: any) => {
    //   return NewsChannels.map(item);

    // });
    // const spItems = z.array(NewsChannels.schema).parse(items);

    // const newsChannels = spItems.map((item) => {
    //   const newsChannel: NewsChannel = {
    //     channelName: item.Title,
    //     category: item.NewsCategoryLookupId ?? ""
    //   };
    //   return newsChannel;
    // });
    // return newsChannels;
  }
}
