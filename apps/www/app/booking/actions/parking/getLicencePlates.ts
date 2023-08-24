import { WithId } from "mongodb"

import { connect } from "@/lib/mongodb"

export interface LicencePlatesMongo extends WithId<Document> {
  licenceplates: string[]
}

export async function getLicencePlates(email: string) {
  const filter = {
    upn: "karlo.mrakovcic@nexigroup.com",
  }
  const projection = {
    licenceplates: 1,
    _id: 0,
  }
  const client = await connect()
  const coll = client.db("booking").collection("users")
  const cursor = coll.find(filter, { projection })
  const result = (await cursor.toArray()) as LicencePlatesMongo[]
  const plates = result[0].licenceplates
  await client.close()
  return plates
}
