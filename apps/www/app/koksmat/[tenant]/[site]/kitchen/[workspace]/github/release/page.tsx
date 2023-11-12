import React, { useMemo } from 'react';

import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';
import { findWorkspace } from '../../..';

interface WorkspaceProps {
    params: {
        workspace: string;
    }
}

/**
 * 
 * @param props 
 * @returns 
 * 
 * gh repo set-default koksmat-com/ui to set a default repo
 */
export default function Workspace(props: WorkspaceProps) {
  const ws = useMemo(() => {return findWorkspace(props.params.workspace)}, [props.params.workspace]);

   
    return (<div>
    {ws && <div>
      <div>Code</div>
      <RunServerProcess cmd={'gh'} args={["release", "create", "v1.1.0.2","--target","v1.1", "--notes", `"bugfix release"`]} timeout={10} channelname={'gh'} cwd={ws.cwd} />
    </div>}
    
    </div>)
}