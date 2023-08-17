import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const countrySchema = z.object({
  countryName:z.string(),
  countryCode:z.string(),
  sortOrder:z.number(),

})


export type Country = z.infer<typeof countrySchema>


// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const unitSchema = z.object({
  unitName:z.string(),
  unitCode:z.string(),
  unitType:z.string(),
  sortOrder:z.number(),

})


export type Unit = z.infer<typeof unitSchema>
