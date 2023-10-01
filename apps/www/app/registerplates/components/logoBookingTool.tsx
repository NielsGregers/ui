import React from "react"
import Image from "next/image"

function LogoBookingTool() {
  return (
    <div className="flex max-h-12 flex-row ">
      <Image
        src="/LOGO_Booking_black.png"
        alt="Booking"
        height={20}
        width={50}
        className="dark:hidden"
      />
      <Image
        className="hidden dark:block"
        src="/LOGO_Booking_white.png"
        alt="Booking"
        height={20}
        width={50}
      />
      <div className="text-md ml-2 mt-1 flex flex-col font-bold">
        <div>Booking</div>
        <div>Tool</div>
      </div>
    </div>
  )
}

export default LogoBookingTool
