import React, { useContext, useMemo } from 'react';
import ListTasks from './tasks';
import { KoksmatContext } from '@/app/koksmat/context';



export default function Workspace() {
 const koksmat = useContext(KoksmatContext);    
   
    return (<div>
 {koksmat?.kitchenSpace &&  <ListTasks cwd={koksmat?.kitchenSpace.cwd}/> }
    </div>)
}