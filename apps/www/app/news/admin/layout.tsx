/* eslint-disable tailwindcss/classnames-order */
import React, { Suspense } from 'react'

import { MainNav } from './components/main-nav';
import { LoginButton } from '@/components/login';
import { getUserSession } from '@/lib/user';
import { ForModule } from '@/components/roles';

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <ForModule module="News">
      <div className="container">
        <MainNav />
        {children}
      </div>
    

</ForModule>

  )
}
