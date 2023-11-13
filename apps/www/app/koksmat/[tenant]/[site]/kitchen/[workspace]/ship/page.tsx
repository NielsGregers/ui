import React, { useMemo } from 'react';

import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';
import { findWorkspace } from '../..';

interface WorkspaceProps {
    params: {
        workspace: string;
    }
}

export default function Connections(props: WorkspaceProps) {
  const ws = useMemo(() => {return findWorkspace(props.params.workspace)}, [props.params.workspace]);

   
    return (<div>
    {ws && <div>
      <div>Code</div>
     
      <RunServerProcess cmd={'code'} args={["-v"]} timeout={10} channelname={'git'} cwd={ws.cwd} />
    </div>}
    
    </div>)
}