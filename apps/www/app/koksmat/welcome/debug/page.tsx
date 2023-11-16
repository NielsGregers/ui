"use client"
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { KoksmatContext } from '@/app/koksmat/context';



import { PageContextSectionHeader } from '../../tenants/[tenant]/site/[site]/components/page-section-header';
import { PowerShell } from '../../components/powershell';
import { AzureContext } from '../../components/azureContext';



export default function AzSubscriptions() {
  
  const koksmat = useContext(KoksmatContext);
  useEffect(() => {
    if (!koksmat.options.showDebug) {
    koksmat.setOptions({showDebug:true,showContext:koksmat.options.showContext})
    }
   
  }, [koksmat])
  
  const [userEmail, setuserEmail] = useState("")
 return (<div>


      <PageContextSectionHeader title={'Components'} />
      Email: {userEmail}
      
      <AzureContext onData={ctx=>setuserEmail(ctx.Account.Id)} />

    </div>

 )
}