import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const schema = z.object({
  primarysmtpaddress: z.string(),
  displayname: z.string(),
  exchangeobjectid: z.string()
  
})

export type SharedMailboxListItem = z.infer<typeof schema>
