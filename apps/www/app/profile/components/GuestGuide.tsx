
"use client"

import * as React from "react"

import { formattedMoney } from "@/lib/formats"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"


type GuideProps = {
  html :string
  continueToSignin: () => void;
  cancel: () => void

}
export function GuestGuide(props: GuideProps) : JSX.Element {
 

    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="mx-auto w-max align-middle">
           <Button type="button" variant="secondary" ><div className=" p-3  ">Read Guide </div>  </Button>
           </div>
        </DialogTrigger>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>How to get access</DialogTitle>
          </DialogHeader>

        <div className="overflow-auto"  dangerouslySetInnerHTML={{__html: props.html}}>


        </div>
          <div className=" mx-auto mt-5">
            <Button type="submit" onClick={()=>props.continueToSignin()}>
              <div className=" p-3">Close</div>
              
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
 
}
