
import { promises as fs } from "fs"
import path from "path"

import { z } from "zod"

import ToSmall from "@/components/tosmall"



import { NextResponse } from "next/server"
import { searchUser } from "@/services/officegraph/users"



export async function POST(
  req: Request) {

    const { wildcard } = await req.json()
    
    const searchReceipient = await searchUser(wildcard)
    
    if (searchReceipient.hasError){
      return new Response(searchReceipient.errorMessage, {
        status: 500,
      })
    }

    return  NextResponse.json(searchReceipient.data)
    
}