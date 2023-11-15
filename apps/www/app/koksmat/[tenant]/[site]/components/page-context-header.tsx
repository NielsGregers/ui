"use client"
import { useContext } from "react"
import { KoksmatContext } from "../../../context"

export function PageContextHeader(props: { title: string }) {
  const { title } = props
  const koksmat = useContext(KoksmatContext)
  return <div>
    <div className="m-3 ml-0 rounded-xl bg-slate-800 text-gray-50">
      <div className="ml-3 p-4 text-3xl">{title} </div>
      {koksmat.options.showContext && JSON.stringify(koksmat)}
    </div>
    <div>
      <div className="ml-2 mr-4 mt-[-10px] flex space-x-2  text-xs" > 
      <div>{koksmat.domain}</div>
      <div className="grow" />
      <div> {koksmat?.currentstation?.cwd}</div></div>
    </div>
  </div>
}

