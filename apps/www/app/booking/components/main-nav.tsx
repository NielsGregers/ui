"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ForRole } from "@/components/roles"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/booking" className="mr-6 flex items-center space-x-2">
        <Image
          src="/LOGO_Booking_black.png"
          alt="Booking"
          height={30}
          width={30}
          className="dark:hidden"
        />
        <Image
          className="hidden dark:block"
          src="/LOGO_Booking_white.png"
          alt="Booking"
          height={30}
          width={30}
        />

        {/* <Icons.logo className="h-6 w-6" /> */}
        <span className="hidden font-bold sm:inline-block">Booking</span>
      </Link>

      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/booking/admin"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/booking/admin")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Admin
        </Link>
      </nav>
    </div>
  )
}
