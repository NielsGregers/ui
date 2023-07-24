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
    <div className=" flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
          <DocsSidebarNav items={docsConfig.exchangeNav} />
        </ScrollArea>
      </aside>
      <Suspense fallback={<Loading />}>
      {children}</Suspense>
      </div>
    </div>
  


        
  )
}
