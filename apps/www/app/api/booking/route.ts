// app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
    
    const formData = await req.formData()
    const text = formData.get("textfield")
    // Remember to enforce type here and after use some lib like zod.js to check it
   

    return NextResponse.json({ message: 'Files Created' });
}