import { ReactElement, useContext, useState } from "react"

import { NavigationContext } from "@/app/koksmat/navigator/context"
import { Container, Waypoint } from "@/app/koksmat/navigator/navcomponents/journey-schema"

export default function ContainerDefaults(props: {
  params: { portname: string,containername:string }
  waypoint?: Waypoint
  container?: Container
  children?: ReactElement
}) {
  
  const { children ,container,} = props
  const { portname, containername} = props.params


 if (!container) return null

  return (
    <div className="mt-4">
      <div className="bold text-xl">Container: {containername} at {portname}</div>
      {/* <div>{waypoint?.loads.containers.length ?? 0} Containers to load</div> */}
       {/* <pre>{JSON.stringify(container,null,2)}</pre>  */}
      <div className="mt-4 flex min-w-full space-x-2 ">
      {/* <div>
        <div className="bold border-b-1">Needs</div>
        <div>{container.needs.map(need=><div className="p-1" key={need}>{need}</div>)}</div>
        <div></div>
      </div> */}
         <div className="grow">
        <div className="bold border-b-1 ">Who</div>
        <div>{container.who.map(who=><div className="p-1" key={who}>{who}</div>)}</div>
        <div></div>
      </div>
      <div className="grow">
        <div className="bold border-b-1 grow">Produces</div>
        <div>{container.produces.map(need=><div className="p-1" key={need}>{need}</div>)}</div>
        <div></div>
      </div>

   
      </div>
      {children}
    </div>
  )
}
