"use client"

import { useContext, useEffect, useState } from "react"

import { NavigationContext, NavigationContextProps, Position } from "./context"
import { NavigationTrace } from "./navcomponents/elements"



type Props = {
  children?: React.ReactNode;
}

export const NavigationProvider = ({ children }: Props) => {

const [traceLevel, settraceLevel] = useState(5)
const [row, setrow] = useState(0)
const [whatIf, setwhatIf] = useState(false)
const [column, setcolumn] = useState(0)

const [batch, setbatch] = useState(0)
const [version, setversion] = useState(0)
const [bag, setbag] = useState(new Map<string, string>())
  const navigator: NavigationContextProps = {
    ship: function (tag: string, data: string): void {
      bag.set(tag, data)
      setversion(version + 1)
    },
    traceLevel,

    position: {
      row,
      column
    },
    setTraceLevel: function (level: NavigationTrace): void {
      switch (level) {
        case "none":
          settraceLevel(0)
          break
        case "error":
          settraceLevel(1)
          break
        case "warning":
          settraceLevel(2)
          break
        case "info":
          settraceLevel(3)
          break
        case "verbose":
          settraceLevel(4)
          break
        case "debug":
          settraceLevel(5)
          break
        default:
          break
      }

    },

    setPosition: function (position: Position): void {
      setrow(position.row)
      setcolumn(position.column)
    },
    whatIf,
    setWhatIf: function (on: boolean): void {
      setwhatIf(on)
    },
    bag,
    newBatch: function (): void {
      setbatch(batch + 1)
      
    },
    batch: batch,
    version
  }
  return (
    <NavigationContext.Provider value={navigator}>
      {children}
    </NavigationContext.Provider>
  )
}
