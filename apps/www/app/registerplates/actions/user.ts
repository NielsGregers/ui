"use server"

import { WithId } from "mongodb"

import { connect, connectBooking } from "@/lib/mongodb"

interface LicencePlates extends WithId<Document> {
  licenceplates: string[]
}

export async function getUserPlates(email: string) {
  const filter = {
    upn: email,
  }
  const projection = {
    _id: 0,
    upn: 0,
  }
  const client = await connectBooking()
  const coll = client.db("booking-cro").collection("users")
  const cursor = coll.find(filter, { projection })
  const data = (await cursor.toArray()) as LicencePlates[]
  const result = data[0]?.licenceplates ?? []
  await client.close()
  return result
}

export async function addUserPlates(email: string, plates: string[]) {
  const filter = {
    upn: email,
  }
  const updateDoc = {
    $set: {
      licenceplates: plates,
    },
  }
  const client = await connectBooking()
  const coll = client.db("booking-cro").collection("users")
  const cursor = coll.find({ upn: email })
  const user = await cursor.toArray()
  if (user.length <= 0) {
    //create a user with a new licence plate
    return await coll.insertOne({
      upn: email,
      licenceplates: plates,
    })
  } else {
    const result = await coll.updateOne(filter, updateDoc)
    await client.close()
    return result
  }
}
