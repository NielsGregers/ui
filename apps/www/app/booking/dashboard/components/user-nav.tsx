"use client"
import React, { use, useContext } from "react"

// import { getUserSession } from "@/lib/user"
// import { LoginButton, LogoutButton } from "@/components/login"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar"
import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
import { BookingContext } from "../../context"

// async function getSession() {
//   return getUserSession()
// }
export function UserNav() {
  const bookingContext = useContext(BookingContext)

  // return <pre>{JSON.stringify(bookingContext, null, 2)}</pre>
  if (!bookingContext.account) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage /> 

              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem>
            Login in - Not implemented
            {/* <LoginButton /> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <AvatarImage /> 
          {/* <Avatar className="h-6 w-6 ">
            <AvatarImage src={session?.user?.image as string} alt="@shadcn" />
            <AvatarFallback>
              {session?.user?.name
                ?.match(/(^\S\S?|\s\S)?/g)
                ?.map((v) => v.trim())
                ?.join("")
                .match(/(^\S|\S$)?/g)
                ?.join("")
                .toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {bookingContext.account?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {bookingContext.account?.username}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem >
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem>
          <LogoutButton />
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
