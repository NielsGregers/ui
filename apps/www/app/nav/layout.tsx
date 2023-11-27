
import React from "react"
import { NavigationProvider } from "@/app/koksmat/navigator/contextprovider"


export default function JourneyLayoutRoot(props: {
  children: React.ReactNode
}) {
  
  return (
  
      <NavigationProvider>
  
          {props.children}

      </NavigationProvider>

  )
}
