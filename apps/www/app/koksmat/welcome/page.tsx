"use client"
import React, { useContext, useMemo, useState } from 'react';
import { KoksmatContext } from '@/app/koksmat/context';


import ListAzAccounts from './az-accounts';
import { PageContextSectionHeader } from '../tenants/[tenant]/site/[site]/components/page-section-header';




export default function AzSubscriptions() {
  
  const koksmat = useContext(KoksmatContext);
 return (<div>

   
      <PageContextSectionHeader title={'Introducing Koksmat'} />

     {/* <RunServerProcess cmd={'pwsh'} args={["/Users/nielsgregersjohansen/kitchens/noma/get-site-allpages-test.ps1","-siteurl","https://christianiabpos.sharepoint.com/sites/nexiintra-hub"]} timeout={3600} channelname={'pwsh'}  />
     */}

    </div>

 )
}