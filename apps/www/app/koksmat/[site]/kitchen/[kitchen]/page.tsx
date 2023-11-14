"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useMemo } from 'react';


import { PageContextSectionHeader } from '../../components/page-section-header';
import { KoksmatContext } from '@/app/koksmat/context';

export default function Workspace() {
const koksmat = useContext(KoksmatContext)
    return (<div>
           
   <PageContextSectionHeader title="Introduction" />
    {koksmat?.currentKitchen && <div>
<img src={koksmat?.currentKitchen.image} alt="Kitchen image"/>

    </div>}
    
    </div>)
}