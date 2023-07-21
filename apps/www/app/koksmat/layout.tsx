import React from 'react';
import LeftNav from "./leftnav"
import Link from 'next/link';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <div className="flex h-screen">

      <LeftNav />

      <div className="w-full">
        {children}
      </div>
    </div>





  )
}
