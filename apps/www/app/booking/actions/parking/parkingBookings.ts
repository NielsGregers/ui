"use server"

import { all } from "axios"
import { WithId } from "mongodb"

import { connect, connectBooking } from "@/lib/mongodb"

export interface UserParkingBookingMongo extends WithId<Document> {
  title: string
  plates: string
  date: string
  EV: boolean
  handicapped: boolean
  floor: string
  free: string[]
}

export interface ParkingSpace extends WithId<Document> {
  title: string
  bookedBy: string
  permanent: boolean
  EV: boolean
  handicapped: boolean
  licence: string
  free: string[]
  floor: string
}

export interface UserParkingBooking {
  id: string
  parkingTitle: string
  plates: string
  date: string
  EV: boolean
  handicapped: boolean
  floor: string
  type: "permanent" | "booked"
}
interface ParkingBooking {
  _id: string
  parking: string
  date: string
  user: string
  plates: string
}

export interface ParkingSpotBooking {
  _id: string | undefined
  parking: string
  user: string | undefined
  plates: string | undefined
  type: "permanent" | "booked"
  EV: boolean
  handicapped: boolean
}

//new
export async function getBookingsByDate(date: Date) {
  let dateString = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  //get all permanent parking spots with datestring in free array and all parking spots with false as permanent

  const client = await connectBooking()
  const parkingSpacesCollection = client.db("booking-cro").collection("parking")
  const parkingBookingsCollection = client
    .db("booking-cro")
    .collection<ParkingBooking>("parking_bookings")

  const bookingsForDate = (await parkingBookingsCollection
    .find({ date: dateString })
    .toArray()) as ParkingBooking[]

  //get all parking spots that are booked for date and are not permanent or are permanent and date is not in free array
  const bookedParkingSpaces = await parkingSpacesCollection
    .find({
      $or: [
        {
          title: { $in: bookingsForDate.map((booking) => booking.parking) },
        },
        {
          permanent: true,
          free: { $nin: [dateString] },
        },
      ],
    })
    .toArray()

  //convert bookedParkingSpaces to ParkingSpotBooking
  const bookedParkingSpacesConverted: ParkingSpotBooking[] =
    bookedParkingSpaces.map((booking) => {
      if (booking.permanent && !booking.free.includes(dateString)) {
        return {
          _id: booking._id.toString(),
          parking: booking.title,
          user: booking.bookedBy,
          plates: booking.licence.toUpperCase(),
          type: "permanent",
          EV: booking.EV,
          handicapped: booking.handicapped,
        }
      } else {
        const bookingForDate = bookingsForDate.find(
          (booking2) => booking2._id === booking.title + "_" + dateString
        )
        return {
          _id: bookingForDate?._id.toString(),
          parking: booking.title,
          user: bookingForDate?.user,
          plates: bookingForDate?.plates.toUpperCase(),
          type: "booked",
          EV: booking.EV,
          handicapped: booking.handicapped,
        }
      }
    }) ?? []
  client.close()
  return bookedParkingSpacesConverted
}

//old
// export async function getUsersBookingByDate(userEmail: string, date: Date) {
//   let dateString: string = date.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   })

//   const client = await connectBooking()

//   //find permanent bookings
//   const filter = {
//     permanent: true,
//     // bookedBy: userEmail,
//   }

//   const coll = client.db("booking-cro").collection("parking")
//   const cursor = coll.find(filter)
//   const permanentBookings = await cursor.toArray()
//   const myPermanent = permanentBookings.filter((permParking) => {
//     return permParking.bookedBy === userEmail
//   })
//   let booking: UserParkingBooking | undefined = undefined
//   let availableSpaces: number | undefined = undefined
//   if (myPermanent.length > 0) {
//     let free = myPermanent[0].free as string[]

//     if (!free.includes(dateString)) {
//       booking = {
//         id: myPermanent[0]._id.toString(),
//         parkingTitle: myPermanent[0].title,
//         EV: myPermanent[0].EV,
//         handicapped: myPermanent[0].handicapped,
//         date: dateString,
//         plates: myPermanent[0].licence,
//         floor: myPermanent[0].floor,
//         type: "permanent",
//       }
//     }
//   }

//   if (booking === undefined) {
//     const bookingColl = client.db("booking-cro").collection("parking_bookings")
//     const bookingCursor = bookingColl.find({
//       user: userEmail,
//       date: dateString,
//     })
//     const bookingResult = await bookingCursor.toArray()
//     if (bookingResult.length > 0) {
//       const oneBooking = bookingResult[0]
//       const parkingResult = (await coll
//         .find({
//           title: oneBooking.parking,
//         })
//         .toArray()) as UserParkingBookingMongo[]
//       booking = {
//         id: bookingResult[0]._id.toString(),
//         parkingTitle: parkingResult[0].title,
//         EV: parkingResult[0].EV,
//         handicapped: parkingResult[0].handicapped,
//         date: oneBooking.date,
//         plates: oneBooking.plates,
//         floor: parkingResult[0].floor,
//         type: "booked",
//       }
//     }
//   }
//   await client.close()
//   return { booking, availableSpaces }
// }

export async function getBookingByDate(userEmail: string, date: Date) {
  let dateString: string = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const client = await connectBooking()

  const coll = client.db("booking-cro").collection("parking")
  const cursor = coll.find({})
  const allParkingSpots = await cursor.toArray()

  let booking: UserParkingBooking | undefined = undefined
  let availableSpaces: number | undefined = undefined

  //Check if user has permanent booking for date and retrieve parking spot
  const result = allParkingSpots.filter((parkingSpot) => {
    return (
      parkingSpot.permanent &&
      parkingSpot.bookedBy === userEmail &&
      !parkingSpot.free.includes(dateString)
    )
  })

  if (result.length > 0) {
    booking = {
      id: result[0]._id.toString(),
      parkingTitle: result[0].title,
      EV: result[0].EV,
      handicapped: result[0].handicapped,
      date: dateString,
      plates: result[0].licence,
      floor: result[0].floor,
      type: "permanent",
    }
  }

  if (booking === undefined) {
    const bookingColl = client.db("booking-cro").collection("parking_bookings")
    const bookingCursor = bookingColl.find({
      // user: userEmail,
      date: dateString,
    })
    const allBookings = await bookingCursor.toArray()
    const bookingResult = allBookings.filter((booking) => {
      return booking.user === userEmail
    })
    if (bookingResult.length > 0) {
      const oneBooking = bookingResult[0]

      const parkingResult = allParkingSpots.filter((parkingSpot) => {
        return parkingSpot.title === oneBooking.parking
      })

      booking = {
        id: bookingResult[0]._id.toString(),
        parkingTitle: parkingResult[0].title,
        EV: parkingResult[0].EV,
        handicapped: parkingResult[0].handicapped,
        date: oneBooking.date,
        plates: oneBooking.plates,
        floor: parkingResult[0].floor,
        type: "booked",
      }
    } else {
      booking = undefined
      availableSpaces =
        allParkingSpots.length -
        allBookings.length -
        allParkingSpots.filter((parkingSpot) => {
          return parkingSpot.permanent && !parkingSpot.free.includes(dateString)
        }).length
    }
  }
  await client.close()
  return { booking, availableSpaces }
}

//NEEDS TO BE OPTIMIZED!!!
export async function getParkingAvailability(date: Date) {
  const dateString = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  let filter = {
    $or: [
      {
        permanent: false,
      },
      {
        permanent: true,
        free: { $in: [dateString] },
      },
    ],
  }
  const client = await connectBooking()
  const parkingSpacesCollection = client.db("booking-cro").collection("parking")
  const parkingBookingsCollection = client
    .db("booking-cro")
    .collection<ParkingBooking>("parking_bookings")

  const bookingsForDate = (await parkingBookingsCollection
    .find({ date: dateString })
    .toArray()) as ParkingBooking[]

  const availableParkingSpaces = await parkingSpacesCollection
    .find({
      $and: [
        filter,

        { title: { $nin: bookingsForDate.map((booking) => booking.parking) } },
      ],
    })
    .toArray()

  return availableParkingSpaces.length
}

export async function getAvailableParkingSpaces(date: Date) {
  const dateString = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  let filter = {
    $or: [
      {
        permanent: false,
      },
      {
        permanent: true,
        free: { $in: [dateString] },
      },
    ],
  }
  const client = await connectBooking()
  const parkingSpacesCollection = client.db("booking-cro").collection("parking")
  const parkingBookingsCollection = client
    .db("booking-cro")
    .collection<ParkingBooking>("parking_bookings")

  const bookingsForDate = (await parkingBookingsCollection
    .find({ dateString })
    .toArray()) as ParkingBooking[]

  const availableParkingSpaces = await parkingSpacesCollection
    .find({
      $and: [
        filter,

        { title: { $nin: bookingsForDate.map((booking) => booking.parking) } },
      ],
    })
    .toArray()
  client.close()
  return availableParkingSpaces
}
export interface BookingConfirmationType {
  success: boolean
  cause:
    | "No available parking slots"
    | "No available parking slots for EV"
    | "No available parking slots for handicapped"
    | "No available parking slots for EV and handicapped"
    | "Success"
    | "Unknown"
}

//NEW
export async function newParkingBooking(
  date: string,
  userEmail: string,
  plates: string,
  EV: boolean,
  handicapped: boolean,
  iteration: number,
  errorBefore: number
): Promise<BookingConfirmationType> {
  let bookingType: "EV" | "handicapped" | "normal" | "both" = "normal"
  let filter = {
    $or: [
      {
        permanent: false,
        EV: false,
        handicapped: false,
      },
      {
        permanent: true,
        EV: false,
        handicapped: false,
        free: { $in: [date] },
      },
    ],
  }
  if (EV && !handicapped) {
    filter = {
      $or: [
        {
          permanent: false,
          EV: true,
          handicapped: false,
        },
        {
          permanent: true,
          EV: true,
          handicapped: false,
          free: { $in: [date] },
        },
      ],
    }
    bookingType = "EV"
  }
  if (handicapped && !EV) {
    filter = {
      $or: [
        {
          permanent: false,
          EV: false,
          handicapped: true,
        },
        {
          permanent: true,
          EV: false,
          handicapped: true,
          free: { $in: [date] },
        },
      ],
    }
    bookingType = "handicapped"
  }
  if (handicapped && EV) {
    filter = {
      $or: [
        {
          permanent: false,
          EV: true,
          handicapped: true,
        },
        {
          permanent: true,
          EV: true,
          handicapped: true,
          free: { $in: [date] },
        },
      ],
    }
    bookingType = "both"
  }
  const client = await connectBooking()
  const parkingSpacesCollection = client.db("booking-cro").collection("parking")
  const parkingBookingsCollection = client
    .db("booking-cro")
    .collection<ParkingBooking>("parking_bookings")

  const bookingsForDate = (await parkingBookingsCollection
    .find({ date })
    .toArray()) as ParkingBooking[]

  const availableParkingSpaces = await parkingSpacesCollection
    .find({
      $and: [
        filter,

        { title: { $nin: bookingsForDate.map((booking) => booking.parking) } },
      ],
    })
    .toArray()

  if (availableParkingSpaces.length <= 0) {
    if (bookingType === "normal") {
      return await newParkingBooking(
        date,
        userEmail,
        plates,
        EV,
        true,
        iteration + 1,
        errorBefore
      )
    }
    if (bookingType === "EV") {
      if (iteration > 0) {
        return { success: false, cause: "No available parking slots" }
      }
      return { success: false, cause: "No available parking slots for EV" }
    }
    if (bookingType === "handicapped") {
      if (iteration > 0) {
        return newParkingBooking(
          date,
          userEmail,
          plates,
          true,
          false,
          iteration + 1,
          errorBefore
        )
      }
      return {
        success: false,
        cause: "No available parking slots for handicapped",
      }
    }
    if (bookingType === "both") {
      return {
        success: false,
        cause: "No available parking slots for EV and handicapped",
      }
    }
  }

  const result = await parkingBookingsCollection.insertOne({
    _id: availableParkingSpaces[0].title + "_" + date,
    parking: availableParkingSpaces[0].title,
    date,
    user: userEmail,
    plates,
  })

  if (result.insertedId === null) {
    //couldn't insert
    if (errorBefore > 0) {
      await client.close()
      return { success: false, cause: "Unknown" }
    } else {
      if (iteration == 0) {
        client.close()
        return await newParkingBooking(
          date,
          userEmail,
          plates,
          EV,
          handicapped,
          0,
          errorBefore + 1
        )
      } else if (iteration == 1) {
        client.close()
        return await newParkingBooking(
          date,
          userEmail,
          plates,
          EV,
          false,
          0,
          errorBefore + 1
        )
      } else {
        client.close()
        return await newParkingBooking(
          date,
          userEmail,
          plates,
          false,
          false,
          0,
          errorBefore + 1
        )
      }
    }
  } else {
    let bookingId = result.insertedId.toString()
    let bookedParking = availableParkingSpaces[0].title
    // add event to calendar

    await client.close()
    return { success: true, cause: "Success" }
  }

  // await coll.findOneAndUpdate(
  //   { _id },
  //   { $set: user },
  //   { returnDocument: "after" }
  // )
}

export async function deleteBooking(booking: UserParkingBooking) {
  let result
  const client = await connectBooking()

  if (booking.type === "permanent") {
    const parkingSpacesCollection = client
      .db("booking-cro")
      .collection<ParkingSpace>("parking")
    //add date from booking to free array
    result = await parkingSpacesCollection.findOneAndUpdate(
      { title: booking.parkingTitle },
      { $push: { free: booking.date } }
    )
  } else {
    const parkingBookingsCollection = client
      .db("booking-cro")
      .collection<ParkingBooking>("parking_bookings")
    //delete booking
    result = await parkingBookingsCollection.findOneAndDelete({
      _id: booking.id,
    })
  }

  await client.close()
  return result.ok === 1 ? true : false
}
