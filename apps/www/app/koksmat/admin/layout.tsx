/* eslint-disable tailwindcss/classnames-order */
import React, { Suspense } from 'react'
import LeftNavAdmin from './leftnav'
 function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <div>Loading</div>
}
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  
    <div className="flex">
        
          <LeftNavAdmin />


 
      <div className="overflow-auto h-max w-full">
        <Suspense fallback={<Loading />}>
      {children}</Suspense>
      </div>
    </div>




        
  )
}
