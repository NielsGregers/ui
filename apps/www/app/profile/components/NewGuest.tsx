"use client";
import * as React from "react";


import { Sheet,SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";

import { useState } from "react";
import { InvitationResult } from "../actions/InvitationResult"
import { Check } from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import { GuestGuide } from "./GuestGuide";

type NewGuestProps = {
  SigninGuideHTML : string
  continueToSignin: () => void;
  cancel: () => void
};
export function NewGuest(props: NewGuestProps): JSX.Element {


  return (
    <div>
      <Sheet defaultOpen   >

        <SheetContent className="bg-white sm:max-w-[425px]" >
          <SheetHeader>
            <SheetTitle>Important information</SheetTitle>

          </SheetHeader>


          <div className="mt-5 ">
          <div className="mt-5">We love to have you as a guest. Please read the following information before you continue.
        </div>
        <div className="mt-5">An invitation have been made for your account.  
        </div>
         <div className="mt-5">
         
         <GuestGuide continueToSignin={props.continueToSignin} cancel={props.cancel} html={props.SigninGuideHTML} />
           </div> 

          </div>
          <div  className="mt-5">Be preparred that you need to have a mobile device ready. The first time you sign in, you will be asked to configure Multifactor Authentication (MFA), the next times you will need to confirm using your MFA device</div>
          <div className="mt-10 flex space-x-5" >
          <div className="grow"></div>
            <Button variant={"default"} onClick={props.continueToSignin} >Continue</Button>
            <Button variant={"secondary"} onClick={props.cancel} >Cancel</Button>
          </div>
         
        </SheetContent>
      </Sheet>

    </div>
  );
}
