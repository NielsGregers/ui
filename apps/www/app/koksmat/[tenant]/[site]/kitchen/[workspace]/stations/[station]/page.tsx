import React, { useContext } from 'react';
import { KoksmatContext } from '@/app/koksmat/context';

export default function CookStation() {
    const koksmat = useContext(KoksmatContext)
    return <div>
        <pre>{JSON.stringify(koksmat, null, 2)}</pre>
    </div>
  
}