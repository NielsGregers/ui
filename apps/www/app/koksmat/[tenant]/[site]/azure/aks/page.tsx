"use client"
import React, { useContext, useMemo, useState } from 'react';
import { KoksmatContext } from '@/app/koksmat/context';




import { PageContextSectionHeader } from '../../components/page-section-header';
import ListAzAksClusters from './az-aks-clusters';




export default function AzSubscriptions() {
  
  const koksmat = useContext(KoksmatContext);
 return (<div>

   
      <PageContextSectionHeader title={'Azure Kubernetes Clusters'} />
 <ListAzAksClusters/>

    </div>

 )
}