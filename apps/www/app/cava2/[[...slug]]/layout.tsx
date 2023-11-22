import { JourneyProps, Navigator } from "@/app/koksmat/navigator"
import { NavigationProvider } from "@/app/koksmat/navigator/contextprovider"
import React, { ReactNode } from "react"

//import travelplan from "@/app/koksmat/navigator/";
export default function JourneyLayout(props: 
  
  {  children: React.ReactNode,params: { slug: string[] } }) {
  return (
    <NavigationProvider>
   
    <Navigator
      params={{
        journey: "journey",
        slug: props.params.slug,
      }}
      travelplan={{
        journey: "journey",
        metadata: {
          app: "",
          name: "",
          description: "",
        },
        waypoints: [],
      }}
    >
     {props.children}
     </Navigator>
  </NavigationProvider>

  )
}
