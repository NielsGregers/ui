
"use client"
import { useContext, useEffect, useState } from 'react';
import { MagicboxContext } from '../magicbox-context';
import { getCavaOrders } from './data';
import { CavaContext } from './cavacontext';
import * as React from "react"

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
import Image from 'next/image';
import Link from 'next/link';




export default function Cava() {
  const cava = useContext(CavaContext)
  
  return <div className="h-screen w-full">

    <div className="grid h-screen place-items-center">

    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>CAVA</CardTitle>
        <CardDescription>CAVA is a new service that provides delicious and healthy catering for your meeting rooms</CardDescription>
      </CardHeader>
      <CardContent>
      <Image src="/tapas.png" width={500} height={500} alt="Tapas"
          className="rounded-md" />
      </CardContent>
      <CardFooter className="flex justify-between">
 <div className="flex-grow"></div>
        <Button><Link href="/cava/admin">Administration</Link></Button>
      </CardFooter>
    </Card>






    </div>


  </div>
}
