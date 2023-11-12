import React from 'react';

import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';

export default function Clusters() {
   
    return (<div><div>Clusters</div>
      <RunServerProcess cmd={'kubectx'} args={[]} timeout={10} channelname={'kubectx'}  />
      <div>Current</div>
      <RunServerProcess cmd={'kubectx'} args={["--current"]} timeout={10} channelname={'kubectxcurrent'}  />
    </div>)
}