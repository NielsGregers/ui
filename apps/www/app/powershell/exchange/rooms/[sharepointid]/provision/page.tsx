
import Link from 'next/link';
import React, { use } from 'react';

import { provisionRoom } from '../..';


export default function ProvisionRoom({ params }: { params: { sharepointid: number } }) {


  const { data, error } = use(provisionRoom(params.sharepointid))
  if (error) {
    console.log("Error", error)
    return <div>{error?.error}</div>;
  }
  debugger
  return <div className="h-screen w-full bg-yellow-100">
    <pre>

      {JSON.stringify(data, null, 2)}
    </pre>


  </div>
}
