import React from "react"
import { GenericTable } from "@/app/powershell/components/table"

// This is important, if not set, this page will be statically generated causing the build to fail
// as the build process would need to have access to the database / api's
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Users ',
}

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = 
[
  {
    '$addFields': {
      'id': {
        '$toString': '$_id'
      }, 
      'title': '$identity', 
      'details': '$permissions', 
      'link': 'accesscontrol/', 
      'created_at': '$defaultmodel.created_at', 
      'modified_at': '$defaultmodel.modified_at'
    }
  }, {
    '$project': {
      '_id': 0, 
      'defaultmodel': 0, 
      'securitykey': 0
    }
  }, {
    '$sort': {
      'title': 1
    }
  }
]

export default async function AccessControl() {
  return <GenericTable database="magicbox" collection="access_control"  agg={agg} linkPrefix="/powershell/admin/accesscontrol/" />
}
