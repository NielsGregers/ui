import React from 'react';


import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';


export default function Namespaces() {
   
    return (<div>
      <div>Namespaces in current cluster</div>
      <RunServerProcess cmd={'kubens'} args={[]} timeout={10} channelname={'kubens'}  />
      <div>Current namespace</div>
      <RunServerProcess cmd={'kubens'} args={["--current"]} timeout={10} channelname={'kubens--current'}  />
          
    </div>)
}