"use client"

import { useEffect, useState } from 'react';
import { Socket,io } from 'socket.io-client';

export function SocketLogger(){
    const [log, setlog] = useState<string>("")
    const [socket, setsocket] = useState<Socket>()
    const onConnect = () => {
        debugger
        console.log("connected");
        const newLog = log+"connected\n"
        setlog(newLog)
        if (!socket) return
        socket.emit('helloFromClient',{
            "name":"helloFromClient",
            "data": "xyz"
        } );

    }
    const onDisconnect = () => {
        console.log("disconnected");
        const newLog = log+"disconnected\n"
        setlog(newLog)
    }

    const helloFromServer = (data:any) => {
        console.log("hello from server", data);
        const newLog = log+data.message
        setlog(newLog)

    }
    useEffect(() => {
          // create and assign a socket to a variable.
          let socket = io("ws://localhost:4000",{})
          setsocket(socket)
          socket.connect()
    
    
      return () => {
        socket.disconnect()
      }
    }, [])

    useEffect(() => {
      if (socket){
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('helloFromServer', helloFromServer);

      }
    
     
    }, [socket])
    
    
    return (
<div>
        <div>Sockets</div>
<pre>{log}</pre>
        </div>
    )
}