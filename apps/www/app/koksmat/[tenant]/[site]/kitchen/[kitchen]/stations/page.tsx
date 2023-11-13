import { KoksmatContext } from '@/app/koksmat/context';
import React, { useContext, useMemo } from 'react';


export default function CookingStation() {
    const koksmat = useContext(KoksmatContext);
    return (<div>
        {koksmat?.kitchenSpace && <div>
            <img src={koksmat?.kitchenSpace.image} />

        </div>}

    </div>)
}