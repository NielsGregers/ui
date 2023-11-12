import React, { useMemo } from 'react';

import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';
import { findWorkspace } from '../..';
import ListTasks from './tasks';

interface WorkspaceProps {
    params: {
        workspace: string;
    }
}


export default function Workspace(props: WorkspaceProps) {
  const ws = useMemo(() => {return findWorkspace(props.params.workspace)}, [props.params.workspace]);

   
    return (<div>
 {ws &&  <ListTasks cwd={ws.cwd}/> }
    </div>)
}