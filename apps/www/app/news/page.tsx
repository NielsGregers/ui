
import Link from 'next/link';
import React from 'react';
import { getSharePointData } from './datasources';
import { SelectNewsChannels } from './components/select-news-channels';

// This is important, if not set, this page will be statically generated causing the build to fail
// as the build process would need to have access to the database / api's
export const dynamic = 'force-dynamic'
export default async function Koksmat() {

  const {channels} = await getSharePointData()
  return <div className="h-screen w-full">

    <div className="grid h-screen place-items-center">


      <SelectNewsChannels channels={channels} defaultChannels={[]}/>

    </div>
  </div>
}
