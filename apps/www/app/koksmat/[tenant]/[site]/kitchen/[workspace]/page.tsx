import React, { useMemo } from 'react';

import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';
import { findWorkspace } from '..';

interface WorkspaceProps {
    params: {
        workspace: string;
    }
}

export default function Workspace(props: WorkspaceProps) {
  const ws = useMemo(() => {return findWorkspace(props.params.workspace)}, [props.params.workspace]);

   
    return (<div>
    {ws && <div>
      <div>Workspace: {ws.displayName}</div>
      <div>Branches</div>
      <RunServerProcess cmd={'git'} args={["branch"]} timeout={10} channelname={'git'} cwd={ws.cwd} />
    </div>}
    
    </div>)
}