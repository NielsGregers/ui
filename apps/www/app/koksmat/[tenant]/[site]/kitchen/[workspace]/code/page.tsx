/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useMemo, useState } from 'react';

import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';
import { findWorkspace } from '../..';
import { Button } from '@/registry/new-york/ui/button';
import { PageContextHeader } from '../../../components/page-context-header';
import { PageContextSectionHeader } from '../../../components/page-section-header';

interface WorkspaceProps {
    params: {
        workspace: string;
    }
}

export default function Workspace(props: WorkspaceProps) {
  const ws = useMemo(() => {return findWorkspace(props.params.workspace)}, [props.params.workspace]);
const [run, setrun] = useState(false)
   
    return (<div>
   
   <PageContextSectionHeader title="Code" />
   <div className="flex">
    <div><img src="/koksmat/vscode.webp" alt="vs code logo"/> </div>
    <div><Button onClick={()=>setrun(true)}>Open Visual Studio Code</Button></div>
   </div>
     
     {ws && run && <div>
      <RunServerProcess cmd={'code'} args={["."]} timeout={10} channelname={'git'} cwd={ws.cwd} />
    </div>}
    
    </div>)
}