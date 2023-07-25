
import React from "react"

import {DynamicTable} from "./table"
// This is important, if not set, this page will be statically generated causing the build to fail
// as the build process would need to have access to the database / api's
export const dynamic = 'force-dynamic'
// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.


export default async function SharedMailboxes({ params }: { params: { type: string, date: string, hour: string } }) {

return <DynamicTable/>





 
}
