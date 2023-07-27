import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const schema = z.object({

  database:z.string(),
  subject:z.string(),
  appid:z.string(),
  id:z.string(),
  created_at:z.date(),
  updated_at:z.date(),
  
  
  scriptname:z.string().nullable(),
  input:z.string().nullable(),
  haserror:z.boolean(),
})


export type AuditLogItem = z.infer<typeof schema>
