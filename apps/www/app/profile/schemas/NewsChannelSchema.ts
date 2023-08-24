
import { z } from "zod";



export const newsSchema = z.object({
  channelName: z.string(),
  channelType: z.string(),
  channelCode: z.string(),
  sortOrder: z.string(),
  RelevantUnits: z.object({
    LookupId: z.number(),
    LookupValue: z.string()
  }).array().nullable(),
  Mandatory: z.boolean(),
  RelevantCountires: z.object({
    LookupId: z.number(),
    LookupValue: z.string()
  }).array().nullable(),
  Region: z.string().nullable(),
  NewsCategory: z.string().nullable(),
});


export type NewsChannel = z.infer<typeof newsSchema>;
