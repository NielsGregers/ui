"use server"

import { connect } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { ParkingSpot, ParkingSpotMongo } from "../../admin/parking/components/parking-dashboard"

export async function deleteParkingSpot(parkingSpotId: string) {
  const client = await connect()
  const coll = client.db("booking").collection("parking")
  let result

  try {
    await coll.findOneAndDelete({ _id: new ObjectId(parkingSpotId) })
    result = true
  } catch (error) {
    result = false
  } finally {
    client.close()
  }
  return result
}

export async function getParkingSpaces(){
  const filter = {}

  const client = await connect()
  const coll = client.db("booking").collection("parking")
  const cursor = coll.find(filter)

  const parkingSpotsMongo: ParkingSpotMongo[] = (await 
    cursor.toArray()
  ) as ParkingSpotMongo[]
  const parkingSpots: ParkingSpot[] = parkingSpotsMongo?.map((spot) => {
    return {
      id: spot._id.toString(),
      title: spot.title,
      permanent: spot.permanent,
      bookedBy: spot.bookedBy,
    }
  })
  client.close()

  return parkingSpots
}

export async function addParkingSpot(title: string, bookedBy: string, permanent: boolean, EV:boolean, handicapped:boolean) {
  const client = await connect()
  const coll = client.db("booking").collection("parking")
  const result = await coll.insertOne({
    title,
    bookedBy,
    permanent,
    EV,
    handicapped,
  })
  client.close()
  return result.insertedId
}