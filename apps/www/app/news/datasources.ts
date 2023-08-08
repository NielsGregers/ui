import { getToken, getRootSite, getSubSite, getAllListItems } from "@/lib/officegraph"
import { NewsChannels } from "@/services/sharepoint/nexiintra-home/sharepoint"
import { z } from "zod"
import { NewsChannel } from "./schema"




export async function getSharePointData() {
  const token = await getToken(process.env.SPAUTH_TENANTID as string, process.env.SPAUTH_CLIENTID as string, process.env.SPAUTH_CLIENTSECRET as string)
  const rootSiteResponse = await getRootSite(token)
  const subSiteResponse = await getSubSite(token, rootSiteResponse.data?.siteCollection.hostname as string, "sites/nexiintra-home")

  const channels = await getChannels();

  return {channels}


  async function getChannels() {
    const { data, hasError, errorMessage } = await getAllListItems(token, subSiteResponse.data?.id as string, NewsChannels.listName);
    if (hasError) {
      console.log(errorMessage);
    }

    const items = data?.map((item: any) => {
      return NewsChannels.map(item);

    });
    const spItems = z.array(NewsChannels.schema).parse(items);

    const channels = spItems.map((item) => {
      const i: NewsChannel = {
          channelName: item.Title,
          category: item.Category as string
      };
      return i;
    });
    return channels;
  }
}

