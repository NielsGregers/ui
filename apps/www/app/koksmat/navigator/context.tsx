"use client"

import { createContext } from "react"

import { NavigationTrace, NavigationTraceLevel, ShipProps } from "."

export type Position = {
  row: number
  column: number
}
export type NavigationContextProps = {
  bag: Map<string, string>,
  ship: (tag: string, data: string) => void
  position: Position
  traceLevel: number
  setTraceLevel: (level: NavigationTrace) => void
  batch:number
  version:number
  setPosition: (position: Position) => void
  setWhatIf: (on: boolean) => void
  whatIf: boolean
  newBatch: () => void
  instanceId : string
  setInstanceId: (instanceId: string) => void 
}
export const NavigationContext = createContext<NavigationContextProps>({
  ship: function (tag: string, data: string): void {
    throw new Error("Function not implemented.")
  },
  traceLevel: 0,

  position: {
    row: 0,
    column: 0,
  },
  setTraceLevel: function (level: NavigationTrace): void {
    throw new Error("Function not implemented.")
  },

  setPosition: function (position: Position): void {
    throw new Error("Function not implemented.")
  },
  whatIf: false,
  setWhatIf: function (on: boolean): void {
    throw new Error("Function not implemented.")
  },
  bag: new Map<string, string>(),
  newBatch: function (): void {
    throw new Error("Function not implemented.")
  },
  batch: 0,
  version: 0,
  instanceId: "",
  setInstanceId: function (instanceId: string): void {
    throw new Error("Function not implemented.")
  }
})
