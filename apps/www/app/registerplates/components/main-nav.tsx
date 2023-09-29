"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

export function MainNav() {
  return (
    <div className="mr-4 flex">
      <Link href="/registerplates" className="mr-6 flex items-center space-x-2">
        <Image
          src="/NEXI_RGB_Colore.png"
          alt="Booking"
          height={55}
          width={55}
          className="dark:hidden"
        />
        <Image
          className="hidden dark:block"
          src="/NEXI_RGB_Bianco.png"
          alt="Booking"
          height={55}
          width={55}
        />
      </Link>
    </div>
  )
}
