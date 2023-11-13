import React, { useContext, useMemo } from 'react';

import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';
import { KoksmatContext } from '@/app/koksmat/context';

export default function Connections() {
const koksmat = useContext(KoksmatContext)
    return (<div>
    {koksmat?.kitchenSpace && <div>
      <div>Code</div>
     
      <RunServerProcess cmd={'code'} args={["-v"]} timeout={10} channelname={'git'} cwd={koksmat?.kitchenSpace.cwd} />
    </div>}
    
    </div>)
}