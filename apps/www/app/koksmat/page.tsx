
import Link from 'next/link';
import React from 'react';

export default async function Koksmat() {


  return <div className="h-screen w-full bg-yellow-100">

    <div className="grid h-screen place-items-center">


      <div className="place-items-center">
        <button className="rounded-full bg-[#2D32A9] from-green-400 to-blue-500 p-2 px-10 text-white hover:from-pink-500 hover:to-yellow-500">
          {" "}
          <Link href="/koksmat/admin">Click to get started</Link>
     
        </button>
 
    
      </div>

    </div>
  </div>
}
