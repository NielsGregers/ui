import { siteConfig } from "@/config/site"
import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"
import { ForRole } from "./roles"

export function SiteFooter() {
  return (
    <footer className="place-items-center py-6 md:px-8 md:py-0 ">
      <div className=" flex flex-col  justify-between gap-4 md:h-24 md:flex-row ">
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
          
            <Button variant="link">
              <Link href="/welcome">welcome</Link>
            </Button>
            <Button variant="link">
              <Link href="/news">news</Link>
            </Button>
          <ForRole role="Admin" module="Catering">
            <Button variant="link">
              <Link href="/cava">cava</Link>
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
