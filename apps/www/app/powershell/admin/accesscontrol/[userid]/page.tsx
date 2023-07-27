
import Link from 'next/link';
import React, { use } from 'react';




export default function UserDetails({ params }: { params: { userid: string } }) {


  return <div className="h-screen w-full bg-yellow-100">
    <pre>

      {params.userid}
    </pre>


  </div>
}
