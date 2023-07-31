import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("my-2 flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/powershell/admin"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/powershell/admin/logs/auditlog"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Logs
      </Link>
      
      <Link
        href="/powershell/admin/accesscontrol"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Access Control
      </Link>
    </nav>
  )
}
