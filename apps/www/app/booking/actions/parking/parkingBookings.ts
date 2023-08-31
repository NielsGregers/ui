"use server"

import { connect } from "@/lib/mongodb"

import { ParkingBooking } from "../../admin/parking/components/parking-bookings-table"
import { WithId } from "mongodb"

export interface UserParkingBookingMongo extends WithId<Document> {
  title: string
  plates: string
  date: string
}

export interface UserParkingBooking{
  parkingId: string
  parkingTitle: string
  plates: string
  date: string,
  type:"permanent"|"booked"
}

export async function getBookingsByDate(date: string) {
  const agg = [
    {
      $unwind: "$bookings",
    },
    {
      $match: {
        "bookings.date": date,
      },
    },
    {
      $project: {
        _id: 0,
        title: 1,
        userEmail: "$bookings.userEmail",
        plates: "$bookings.plates",
      },
    },
  ]
  const client = await connect()
  const coll = client.db("booking").collection("parking")
  const cursor = coll.aggregate(agg)
  const result = (await cursor.toArray()) as ParkingBooking[]
  client.close()
  return result
}

export async function getBookingsByUser(userEmail: string, dates?:Date[]) {
  // //first check if user has any permanent bookings
  // const aggPermanent = [ 
  //   {
  //     $match: {
  //       "bookings.userEmail": userEmail,
  //       "bookings.permanent": true,
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       title: 1,
  //       userEmail: "$bookings.userEmail",
  //       plates: "$bookings.plates",
  //       date: "$bookings.date",
  //     },
  //   },
  // ]
  // const client = await connect()
  // const collPermanent = client.db("booking").collection("parking")
  // const cursorPermanent = collPermanent.aggregate(aggPermanent)
  // const resultPermanent = (await cursorPermanent.toArray()) as UserParkingBookingMongo[]
  // const bookingsPermanent: UserParkingBooking[] = resultPermanent?.map((booking) => {
  //   return {
  //     parkingId: booking._id.toString(),
  //     parkingTitle: booking.title,
  //     date: booking.date,
  //     plates: booking.plates,
  //     type:"permanent"
  //   }
  // })

  // if(bookingsPermanent && bookingsPermanent.length > 0){
  //   client.close()
  //   return bookingsPermanent
  // }

  //convert Date[] to string[]
  let datesString:string[] = []

  if(dates && dates.length > 0){
    datesString = dates.map((date) => {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    })
  }


  let agg
  if(dates && dates.length > 0){
    //get bookings by user and dates
    agg = [
      {
        $unwind: "$bookings",
      },
      {
        $match: {
          "bookings.userEmail": userEmail,
          "bookings.date": { $in: datesString },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          userEmail: "$bookings.userEmail",
          plates: "$bookings.plates",
          date: "$bookings.date",
        },
      },
    ]

  }else{
  agg = [
    {
      $unwind: "$bookings",
    },
    {
      $match: {
        "bookings.userEmail": userEmail,
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        userEmail: "$bookings.userEmail",
        plates: "$bookings.plates",
        date: "$bookings.date",
      },
    },
  ]}
  const client = await connect()

  const coll = client.db("booking").collection("parking")
  const cursor = coll.aggregate(agg)
  const result = (await cursor.toArray()) as UserParkingBookingMongo[]
  const bookings: UserParkingBooking[] = result?.map((booking) => {
    return {
      parkingId: booking._id.toString(),
      parkingTitle: booking.title,
      date: booking.date,
      plates: booking.plates,
      type:"booked"
    }
  })
  client.close()
  return bookings
}

export interface BookingConfirmationType{
  success:boolean,
  cause: "No available parking slots"|"No available parking slots for EV"|"No available parking slots for handicapped"|"No available parking slots for EV and handicapped"|"Success"|"Unknown"
}

export async function newBooking(date:string, userEmail:string, plates:string, EV:boolean, handicapped:boolean, iteration:number):Promise<BookingConfirmationType>{
  let bookingType:"EV"| "handicapped" | "normal"|"both" = "normal"
  let filter = {
    $and: [

      {
        permanent: false,
        EV:false,
        handicapped:false
      },
      {
        "bookings.date": {
          $ne: date,
        },
      },
    ],
  }
  if(EV&&!handicapped){
    filter = {
      $and: [
  
        {
          permanent: false,
          EV:true,
          handicapped:false
        },
        {
          "bookings.date": {
            $ne: date,
          },
        },
      ],
    }
    bookingType = "EV"
  }
  if(handicapped&&!EV){
    filter = {
      $and: [
  
        {
          permanent: false,
          EV:false,
          handicapped:true
        },
        {
          "bookings.date": {
            $ne: date,
          },
        },
      ],
    }
    bookingType = "handicapped"
  }
  if(handicapped&&EV){
    filter = {
      $and: [

        {
          permanent: false,
          EV:true,
          handicapped:true
        },
        {
          "bookings.date": {
            $ne: date,
          },
        },
      ],
    }
    bookingType = "both"
  }

  const client = await connect()
  const coll = client.db("booking").collection("parking")
  const cursor = coll.find(filter)
  const result = await cursor.toArray()
  if (result.length <= 0) {
    if(bookingType==="normal"){
      return await newBooking(date, userEmail, plates, EV, true, iteration+1)
    }
    if(bookingType==="EV"){
      if(iteration>0){
        return {success:false, cause:"No available parking slots"}
      }
      return {success:false, cause:"No available parking slots for EV"}
    }
    if(bookingType==="handicapped"){
      if(iteration>0){
        return newBooking(date, userEmail, plates, true, false, iteration+1)
      }
      return {success:false, cause:"No available parking slots for handicapped"}
    }
    if(bookingType==="both"){
      return {success:false, cause:"No available parking slots for EV and handicapped"}
    }
  }
  const _id = result[0]._id
  await coll.updateOne(
    { _id },
    { $push: { bookings: { date: date, userEmail, plates } } }
  )

  // await coll.findOneAndUpdate(
  //   { _id },
  //   { $set: user },
  //   { returnDocument: "after" }
  // )
  await client.close()
  return {success:true, cause:"Success"}
}

export async function deleteBooking(date:string, userEmail:string, plates:string){
  
}