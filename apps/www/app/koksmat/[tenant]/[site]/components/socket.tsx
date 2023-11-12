"use client"

import { useEffect, useMemo, useState } from 'react';
import { Centrifuge } from 'centrifuge';
import { MessageType } from "../server/MessageType";

export function SocketLogger(props: {channelname:string}) {
  const log = useMemo<MessageType[]>(() => { return [] }, [])
  const [refresh, setrefresh] = useState(0)
  const [socket, setsocket] = useState<Centrifuge>()
  const onConnect = () => {

    console.log("connected");
    // log.push("connected")


    if (!socket) return
    // socket.emit('helloFromClient',{
    //     "name":"helloFromClient",
    //     "data": "xyz"
    // } );

  }
  const onDisconnect = () => {
    console.log("disconnected");
    //  log.push("disconnected")

  }

  const receiver = (data: { channel: string, data: MessageType }) => {

    console.log("received", data);

    log.push(data.data)
    setrefresh(new Date().getTime())
  }
  useEffect(() => {
    // create and assign a socket to a variable.

    let socket = new Centrifuge('ws://localhost:8000/connection/websocket')
    setsocket(socket)



    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('connected', onConnect);
      const sub = socket.newSubscription(props.channelname);
      sub.on('publication', receiver);
      sub.subscribe()
      socket.connect()
    }


  }, [socket])


  return (
    <div className="bg-slate-950 p-4 text-green-600">
      {/* <div>Sockets {refresh}</div> */}
      <pre className="h-[500px] overflow-scroll text-xs">
        {log.sort((a, b) => a.timestamp - b.timestamp).map((l, i) => {
          return <div key={i} className={l.isError ? "text-red-500":""}>{l.message}</div>
        })}


      </pre>
    </div>
  )
}