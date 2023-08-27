import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const schema = z.object({
  title:z.string(),
  link:z.string().nullable(),
  details:z.string().nullable(),
  id:z.string(),
  // created_at:z.date().nullable(),
  // updated_at:z.date().nullable(),

})


export type GenericItem = z.infer<typeof schema>
