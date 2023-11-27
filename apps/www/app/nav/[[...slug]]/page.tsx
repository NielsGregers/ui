"use client"

import { useContext } from "react"
import { NavigationContext } from "@/navigator/context"

import { Port,Container } from "."


export default function Page(props: { params: { slug: string[] } }) {
  const { slug } = props.params
  const navigator = useContext(NavigationContext)

  const { bag, position,currentWaypoint,currentContainer } = navigator


  return (
    <div className="min-h-screen">

      {/* 
      cava/port/Planning/container/Resource%20Booking
      
      <Port waypoint={currentWaypoint}  params={{ portname: position.port }}>
        <div> 

        </div>
      </Port>
      <Container waypoint={currentWaypoint} container={currentContainer} params={{
        portname: position.port,
        containername: position.container
        
      }} /> */}

  
     
    </div>
  )
}
