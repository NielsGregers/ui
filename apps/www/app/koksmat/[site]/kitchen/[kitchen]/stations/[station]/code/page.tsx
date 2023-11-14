/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useContext, useMemo, useState } from 'react';

import RunServerProcess from '@/app/koksmat/[site]/components/runserverprocess';

import { Button } from '@/registry/new-york/ui/button';

import { PageContextSectionHeader } from '../../../../../components/page-section-header';
import { KoksmatContext } from '@/app/koksmat/context';


export default function Workspace() {
  const koksmat = useContext(KoksmatContext)
const [run, setrun] = useState(false)
   
    return (<div>
   
   <PageContextSectionHeader title="Code" />
   <div className="flex">
    <div><img src="/koksmat/vscode.webp" alt="vs code logo"/> </div>
    <div><Button onClick={()=>setrun(true)}>Open Visual Studio Code</Button></div>
   </div>
     
     {koksmat?.currentKitchen?.cwd && run && <div>
      <RunServerProcess cmd={'code'} args={["."]} timeout={10} channelname={'git'} cwd={koksmat?.currentKitchen?.cwd} />
    </div>}
    
    </div>)
}