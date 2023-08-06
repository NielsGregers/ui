
"use client"
import React, { use, useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import { Input } from '@/components/ui/input';
import { Button } from '@/registry/new-york/ui/button';
import { toast } from '@/registry/new-york/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';
import { SearchUserForm } from '../components/searchuser';



export default function Koksmat() {
  const [user, setuser] = useState("")
  
  return <div className="h-screen w-full">

    <div className="container">
    user: {user}

      <div className="">
        <SearchUserForm onSelectUser={(n)=>setuser(n)} />


      </div>


    </div>
  </div>
}
