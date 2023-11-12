import React from 'react';

import { Workspaces } from '.';
import Link from 'next/link';
import { Button } from '@/registry/new-york/ui/button';
import { PageContextHeader } from '../components/page-context-header';
import { useProcess } from "@/lib/useprocess"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/registry/new-york/ui/badge"


import { PopUp } from "../components/popup"
export default function ClusterInfo(props: {params:{site: string,tenant:string}}) {
   const {site,tenant} = props.params;
    return (<div>  <PageContextHeader title="Select Kitchen" />
    {Workspaces.map((workspace)=>{
      return (
      
      <div key={workspace.key}>
        <Card  >
              <CardHeader>
                <CardTitle className="text-2xl">{workspace.displayName}</CardTitle>
                <CardDescription>
                  
                </CardDescription>
              </CardHeader>
              <CardContent>
                
              </CardContent>
              <CardFooter>
                <p>
                  {" "}
                  <Button >
        <Link href={`/koksmat/${site}/${tenant}/kitchen/${workspace.key}`}>Open</Link>
        </Button>
                  
                   
                </p>
              </CardFooter>
            </Card>
       
        </div>)
    })}
    
    </div>)
}