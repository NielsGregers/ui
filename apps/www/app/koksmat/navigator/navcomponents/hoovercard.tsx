import { CalendarDays } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function DetailsHoverCard(props : {tag:string,description:string,children:React.ReactElement| React.ReactElement[]}) {
const {description,tag,children} = props
  return (
    
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{tag}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{tag}</h4>
            <p className="text-sm">
            {description}
            </p>
             <div className="flex items-center pt-2">
            {children}
            </div> 
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
   
  )
}