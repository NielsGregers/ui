import React from 'react';

import RunServerProcess from '@/app/koksmat/[site]/components/runserverprocess';
import ViewKubernetesContexts from './viewclusters';
import { PageContextHeader } from '../../components/page-context-header';


export default function Clusters() {
   
    return (<div>        <PageContextHeader title="Clusters"/>
      {/* <RunServerProcess cmd={'kubectl'} args={["config","view","-o=json"]} timeout={10} channelname={'kubectx'}  /> */}
<ViewKubernetesContexts />
    </div>)
}