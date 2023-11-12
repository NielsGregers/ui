import React from 'react';


import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';
import ListPods from '.';


export default function Pods() {
   
    return (<div>
      <div>Pods in current namespace</div>
      {/* <RunServerProcess cmd={'kubectl'} args={["get","pods","-o","json"]} timeout={10} channelname={'kubens'}  />
   */}<ListPods/>
    </div>)
}