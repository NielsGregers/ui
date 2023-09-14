"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";

import { formattedMoney } from "@/lib/formats";
import { Dialog,DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/registry/default/ui/dialog";

import { useState } from "react";

import { Check } from "lucide-react";


type HtmlViewProps = {
  html: string;
 
 
};
export function ViewHTML(props: HtmlViewProps) :JSX.Element {
  const { html } = props;
 
    return (
      <div>
      <Dialog >
        <DialogTrigger asChild>
          <Button variant={"link"}>
            View 
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Body</DialogTitle>
          
          </DialogHeader>

   
          <div className="m-3 h-[90vh] overflow-auto ">
            <div  dangerouslySetInnerHTML={{__html:html}}>


            </div>
            <div>{html}</div>
        
          </div>
        
        </DialogContent>
      </Dialog>

      </div>
    );
  
}
