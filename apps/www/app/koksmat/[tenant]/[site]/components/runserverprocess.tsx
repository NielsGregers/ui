"use client"
import React from 'react';
import { SocketLogger } from './socket';
import { useProcess } from '@/lib/useprocess';

interface RunServerProcessProps {
    cmd:string,
    args:string[],
    timeout:number,
    channelname:string,
    cwd?:string
}

export default function RunServerProcess(props: RunServerProcessProps) {
    const { cmd,args,timeout,channelname,cwd } = props
    const { isLoading, error, data } = useProcess(cmd,args,timeout,channelname,cwd)
    return (<div>
        <pre>
            {cmd} {args.join(" ")}
        </pre>      <pre>
            {cwd} 
        </pre>

        {isLoading && <div>Loading...</div>}
       
        {error && <div className="text-red-700">{error}</div>}
<div>Data
      <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
        {channelname &&
            <SocketLogger channelname={channelname} />}
    </div>)
}