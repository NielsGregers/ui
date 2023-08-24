import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const schema = z.object({

  title:z.string().nullable(),
  created_at:z.date().nullable(),
  mandatory:z.boolean().nullable()
 
  
})

export type RoomsListItem = z.infer<typeof schema>
