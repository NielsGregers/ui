"use client"

import * as React from "react"
import Image from "next/image"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { HamburgerMenuIcon, ViewVerticalIcon } from "@radix-ui/react-icons"
import { HiMail } from "react-icons/hi"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/registry/new-york/ui/button"
import { ScrollArea } from "@/registry/new-york/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/registry/new-york/ui/sheet"
import { docsConfig } from "@/app/booking/config/booking-docs"
import { siteConfig } from "@/app/booking/config/booking-site"

import Rules from "./rules"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <HamburgerMenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/booking"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Image
            src="/LOGO_Booking_black.png"
            alt="Booking"
            height={18}
            width={18}
            className="dark:hidden"
          />
          <Image
            className="hidden dark:block"
            src="/LOGO_Booking_white.png"
            alt="Booking"
            height={18}
            width={18}
          />
          <span className="pl-3 font-bold">Booking</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] px-2 pb-10">
          <div className="container mt-12 flex flex-col space-y-5">
            {/* {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )} */}
            <Rules />
            <a href="mailto:desktopbooking@nexigroup.com" target="_blank">
              <Button className="w-full" variant="outline">
                <HiMail className="mr-2 h-4 w-4" />
                Have a question?
              </Button>
            </a>
          </div>
          {/* <div className="flex flex-col space-y-2">
            {docsConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink
                            href={item.href}
                            onOpenChange={setOpen}
                            className="text-muted-foreground"
                          >
                            {item.title}
                          </MobileLink>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div> */}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
