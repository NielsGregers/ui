import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const schema = z.object({

  email:z.string().nullable(),
  capacity:z.number().nullable(),
  title:z.string(),
  provisioningstatus:z.string(),
  id:z.number(),
  created_at:z.date(),
  updated_at:z.date(),
  deviceserialnumber:z.string().nullable(),
  ciscovideo:z.boolean().nullable(),
  restrictedto:z.string().nullable(),
  teamsmeetingroom:z.boolean().nullable(),
  production:z.boolean().nullable(),
  
})

export type RoomsListItem = z.infer<typeof schema>
