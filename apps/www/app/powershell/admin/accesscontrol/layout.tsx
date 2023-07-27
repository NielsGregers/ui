/* eslint-disable tailwindcss/classnames-order */
import React, { Suspense } from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { ScrollArea } from '@/registry/new-york/ui/scroll-area';
import { DocsSidebarNav } from '@/components/sidebar-nav';
import { docsConfig } from "@/app/powershell/config/powershell-docs"
 function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <div>Loading</div>
}
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);
  
  


return (
  <div className="border-b">
    <div className="mx-8 mt-2 ">

      <Suspense fallback={<Loading />}>
      {children}</Suspense>
      </div>
    </div>
  


        
  )
}
