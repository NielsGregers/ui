import { z } from "zod"


export const newsSchema = z.object({
  channelName:z.string(),
  category:z.string()

})


export type NewsChannel = z.infer<typeof newsSchema>


