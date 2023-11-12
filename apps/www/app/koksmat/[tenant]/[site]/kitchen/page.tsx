import React from 'react';

import { Workspaces } from '.';
import Link from 'next/link';
import { Button } from '@/registry/new-york/ui/button';
export default function ClusterInfo(props: {params:{site: string,tenant:string}}) {
   const {site,tenant} = props.params;
    return (<div><div>Workspaces</div>
    {Workspaces.map((workspace)=>{
      return (<div key={workspace.key}>
        <Button variant={"link"}>
        <Link href={`/koksmat/${site}/${tenant}/kitchen/${workspace.key}`}>{workspace.displayName}</Link>
        </Button>
        </div>)
    })}
    
    </div>)
}