"use client"
import React, { useState } from 'react';
import { SocketLogger } from './socket';
import { useProcess } from '@/lib/useprocess';
import { MessageType } from '../server/MessageType';
import { Button } from '@/registry/new-york/ui/button';

interface RunServerProcessProps {
    cmd: string,
    args: string[],
    timeout: number,
    channelname: string,
    cwd?: string
    caption?: string,
    onMessage?: (data: MessageType) => void;
}

export default function RunServerProcess(props: RunServerProcessProps) {
    const { cmd, args, timeout, channelname, cwd, onMessage,caption } = props
    const { isLoading, error, data } = useProcess(cmd, args, timeout, channelname, cwd)
    const [showTrace, setshowTrace] = useState(false)
    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div className="text-red-700">{error}</div>}
            <div className="mr-4 mt-[-10px] text-right text-xs" >
            <Button variant={"link"} onClick={()=>setshowTrace(!showTrace)}>{caption} Toggle Trace</Button>
            </div>
            {showTrace && <div>

                <pre>
                    {cmd} {args.join(" ")}
                </pre>      <pre>
                    {cwd}
                </pre>
            </div>
            }
            {/* <div>Data
      <pre>{JSON.stringify(data, null, 2)}</pre>
      </div> */}
            {channelname &&
                <SocketLogger traceHidden={!showTrace} channelname={channelname} onMessage={onMessage} />}
        </div>)
}