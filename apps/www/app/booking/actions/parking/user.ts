"use server"

import { WithId } from "mongodb"

import { connect, connectBooking } from "@/lib/mongodb"

import { User } from "../../admin/users/components/user-table-columns"

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

export async function getAllUsers() {
  const clientUser = await connect()
  const clientBooking = await connectBooking()
  const bookingUsersColl = clientBooking.db("booking-cro").collection("users")
  const nextauthUsersColl = clientUser.db("nextauth").collection("users")
  const bookingUsers = await bookingUsersColl.find({}).toArray()

  const users: User[] = []
  for (const bookingUser of bookingUsers) {
    const nextauthUser = await nextauthUsersColl.findOne({
      email: bookingUser.upn,
    })
    users.push({
      id: bookingUser._id.toString(),
      upn: bookingUser.upn,
      licenceplates: bookingUser.licenceplates,
      name: nextauthUser?.name,
    })
  }
  await clientUser.close()
  await clientBooking.close()
  return users
}
