"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/powershell" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          magicbox/powershell
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
      <Link
          href="/powershell/exchange"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/powershell/exchange")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Exchange
        </Link>
        <Link
        
          href="/powershell/sharepoint"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/powershell/sharepoint")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          SharePoint
        </Link>
        <Link
      
        href="/powershell/powerapps"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/powershell/powerapps")
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        PowerApps
      </Link>
        <Link
          href="/powershell/admin"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/powershell/admin")
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
