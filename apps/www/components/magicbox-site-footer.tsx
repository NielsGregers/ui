import { siteConfig } from "@/config/site"
import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"
import { ForRole } from "./roles"

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          <ForRole role="User" module="PowerShell">
            <Button variant="link">
              <Link href="/powershell">powershell</Link>
            </Button>
          </ForRole>
          <ForRole role="Admin" module="Booking">
            <Button variant="link">
              <Link href="/booking">booking</Link>
            </Button>
          </ForRole>
          <ForRole role="Admin" module="Developer">
            <Button variant="link">
              <Link href="/shadcn">shadcn</Link>
            </Button>
          </ForRole>
        </p>
      </div>
    </footer>
  )
}
