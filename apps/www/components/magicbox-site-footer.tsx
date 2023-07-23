import { siteConfig } from "@/config/site"
import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Modules: 
        <Button variant="link">
          <Link href="/koksmat">powershell</Link></Button>
          <Button variant="link">
          <Link href="/booking">booking</Link></Button>
        </p>
      </div>
    </footer>
  )
}
