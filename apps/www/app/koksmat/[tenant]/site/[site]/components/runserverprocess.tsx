"use client"

import React, { useState } from "react"

import { Result } from "@/lib/httphelper"
import { useProcess } from "@/lib/useprocess"
import { Button } from "@/registry/new-york/ui/button"

import { MessageType } from "../server/MessageType"
import { SocketLogger } from "./socket"

interface RunServerProcessProps {
  cmd: string
  ran?: boolean
  setran?: (ran: boolean) => void
  args: string[]
  timeout: number
  channelname: string
  cwd?: string
  caption?: string
  onMessage?: (data: MessageType) => void
  setresult?: (result: Result<string>) => void
}

export default function RunServerProcess(props: RunServerProcessProps) {
  const {
    cmd,
    args,
    timeout,
    channelname,
    cwd,
    onMessage,
    caption,
    ran,
    setran,
  } = props
  const { isLoading, error, data } = useProcess(
    cmd,
    args,
    timeout,
    channelname,
    cwd,
    props.ran,
    props.setran,
    props.setresult
  )
  const [showTrace, setshowTrace] = useState(false)
  const [showCmd, setshowCmd] = useState(false)
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-700">{error}</div>}
      <div className="mr-4 mt-[-10px] text-right text-xs">
        <Button variant={"link"} onClick={() => setshowTrace(!showTrace)}>
          Toggle Trace
        </Button>
      </div>
      {showTrace && (
        <div>
          <div className="flex">
            {ran ? (
              <Button
                variant={"link"}
                onClick={(e) => {
                  if (setran) setran(false)
                }}
              >
                Run again
              </Button>
            ) : (
              <div></div>
            )}

            <Button variant={"link"} onClick={() => setshowCmd(!showCmd)}>
              {showCmd ? "Hide cmd" : "Show cmd"}
            </Button>
            
          </div>
          {showCmd && (
            <div>
              <pre>
                {cmd} {args.join(" ")}
              </pre>{" "}
              <pre>{cwd}</pre>
            </div>
          )}
        </div>
      )}
      {/* <div>Data
      <pre>{JSON.stringify(data, null, 2)}</pre>
      </div> */}
      {channelname && (
        <SocketLogger
          traceHidden={!showTrace}
          channelname={channelname}
          onMessage={onMessage}
        />
      )}
    </div>
  )
}
