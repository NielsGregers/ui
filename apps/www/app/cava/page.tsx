"use client"

import { useContext, useEffect, useState } from "react"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { MagicboxContext } from "../magicbox-context"
import { CavaContext } from "./cavacontext"
import { getCavaOrders } from "./data"
import { roles } from "./data/roles"

export default function Cava() {
  const cava = useContext(CavaContext)

  return (
    <div className="minh-screen w-full">
      <div className="container ">
      <Card className="m-5 w-[350px]">
                  <CardHeader>
                    <CardTitle>CAVA</CardTitle>
                    <CardDescription className="h-[40px]">
                      Handling everything related to meeting, physical, virtual, hybrid, and more.

                    </CardDescription>
                  </CardHeader>
                  <CardContent className="center">
                    <Image
                      src="/cava/cava-dark.svg"
                      width={500}
                      height={500}
                      alt="CAVA"
                      className="rounded-md"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex-grow"></div>
                    {/* <Button disabled={role.version === "draft"}>
                      <Link href={role.link}>{role.name} role</Link>
                    </Button> */}
                  </CardFooter>
                </Card>
        <h2 className={"my-3 text-2xl font-bold leading-none tracking-tight"}>
          Meeting Participant Roles
        </h2>
        <div className="flex flex-wrap">
          {roles
            .filter((r) => r.type === "core")
            .map((role) => {
              return (
                <Card className="m-5 w-[350px]" key={role.key}>
                  <CardHeader>
                    <CardTitle>{role.name}</CardTitle>
                    <CardDescription className="h-[40px]">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="center">
                    <Image
                      src={role.image}
                      width={500}
                      height={500}
                      alt={role.name}
                      className="rounded-md"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex-grow"></div>
                    <Button disabled={role.version === "draft"}>
                      <Link href={role.link}>{role.name} role</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
        </div>

        <h2 className={"my-3 text-2xl font-bold leading-none tracking-tight"}>
          Supporting Roles
        </h2>
        <div className="flex flex-wrap">
          {roles
            .filter((r) => r.type === "supporting")
            .map((role) => {
              return (
                <Card className="m-5 w-[250px]" key={role.key}>
                  <CardHeader>
                    <CardTitle>{role.name}</CardTitle>
                    <CardDescription className="h-[40px]">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={role.image}
                      width={500}
                      height={500}
                      alt={role.name}
                      className="rounded-md"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex-grow"></div>
                    <Button   disabled={role.version === "draft"}>
                      <Link href={role.link}>{role.name} role</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
        </div>
      </div>
    </div>
  )
}
