"use client"
import React, { useContext, useEffect } from 'react';
import { KoksmatContext } from '@/app/koksmat/context';

export default function Tenant(props:{params:{tenant:string}}) {
    const {tenant} = props.params
    const koksmat = useContext(KoksmatContext)
    useEffect(() => {
        koksmat.setTenantContext(tenant)
    
      }, [tenant,koksmat])
    return <div>
        <pre>{JSON.stringify(koksmat, null, 2)}</pre>
    </div>
  
}