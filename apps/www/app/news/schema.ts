import { z } from "zod"


export const newsSchema = z.object({
  channelName:z.string(),
 

  RelevantUnits: z.object({
    LookupId: z.number(),
    LookupValue: z.string()
  }).array().nullable(),
  Mandatory: z.boolean(),
  RelevantCountires: z.object({
    LookupId: z.number(),
    LookupValue: z.string()
  }).array().nullable(),
  Region: z.object({
    LookupId: z.number(),
    LookupValue: z.string()
  }).nullable(),
  NewsCategory: z.object({
    LookupId: z.number(),
    LookupValue: z.string()
  }).nullable(),

})


export type NewsChannel = z.infer<typeof newsSchema>


