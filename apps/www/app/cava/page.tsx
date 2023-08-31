
"use client"
import { useContext, useEffect, useState } from 'react';
import { MagicboxContext } from '../magicbox-context';
import { getCavaOrders } from './data';
import { CavaContext } from './cavacontext';


export default function Cava() {
  const cava = useContext(CavaContext)
  
  return <div className="h-screen w-full bg-yellow-100">

    <div className="grid h-screen place-items-center">
      <pre className="maxh-screen h-5/6 overflow-scroll bg-white">
        {JSON.stringify(cava.orders, null, 2)}
      </pre>



    </div>


  </div>
}
