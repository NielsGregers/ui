import React from "react"
import { WithId } from "mongodb"
import { use } from "react"
import { connect } from "@/lib/mongodb"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"

import { ParkingBookings } from "./parking-bookings-table"
import { ParkingTable } from "./parking-table"

export interface ParkingSpotMongo extends WithId<Document> {
  title: string
  permanent: boolean
  bookedBy: string
}

export interface ParkingSpot {
  id: string
  title: string
  permanent: boolean
  bookedBy: string
}

 function ParkingDashboard() {
  const filter = {}

  const client = use(connect())
  const coll = client.db("booking").collection("parking")
  const cursor = coll.find(filter)

  const parkingSpotsMongo: ParkingSpotMongo[] =
    (use(cursor.toArray())) as ParkingSpotMongo[]
  const parkingSpots: ParkingSpot[] = parkingSpotsMongo?.map((spot) => {
    return {
      id: spot._id.toString(),
      title: spot.title,
      permanent: spot.permanent,
      bookedBy: spot.bookedBy,
    }
  })
  use(client.close())

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {" "}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Parking Spaces
            </CardTitle>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parkingSpots.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Permanently booked
            </CardTitle>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                parkingSpots.filter((park) => {
                  if (park.permanent) return park
                }).length
              }
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Booked in the past week
            </CardTitle>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">70%</div>
            <p className="text-xs text-muted-foreground">+19% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booked today</CardTitle>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">
              -10% from week average
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <ParkingTable data={parkingSpots} />
        <ParkingBookings />
      </div>
    </div>
  )
}

export default ParkingDashboard
