import { NOAPPKEY } from "../constants";
import { getClient } from "../getClient";

export const metadata = {
  title: 'Auditlog PowerShell details',

}




export interface Code {
  value?: number
}

export interface Color {
  name: string
  bright: boolean
}

import Image from "next/image"

import { cn } from "@/lib/utils"


import { AuditlogDetails } from "./components/auditlogentry"



function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  )
}

export  default async function CardsPage({ params }: { params: { objectId: string } }) {

  const {client,token} = await getClient();
  // happends under build in Docker if the env variable is not set
  // impact is that the page is not pre-rendered
  if (token===NOAPPKEY){ 
    return null
  }
  const get = client.get 
  const { objectId } = params;
  const { data, error } = await get("/v1/admin/auditlogs/powershell/{objectId}", {
    cache:  "default", 
  
    params: {
      path: {
        objectId
      }
    },
  });

  if (error) {
    return <div>{error as string}</div>;
  }
  const logEntry = data?.powershellauditlog

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/shadcn/examples/cards-light.png"
          width={1280}
          height={1214}
          alt="Cards"
          className="block dark:hidden"
        />
        <Image
          src="/shadcn/examples/cards-dark.png"
          width={1280}
          height={1214}
          alt="Cards"
          className="hidden dark:block"
        />
      </div>
    
        <div className="col-span-5 grid items-start gap-6 p-10 lg:col-span-1">
         
          <AuditlogDetails params={{
       
            created_at: logEntry?.created_at as string,
            database: logEntry?.database as string,
            appid: logEntry?.appid as string,
            scriptname: logEntry?.scriptname as string,
            input: logEntry?.input as string,
            haserror: logEntry?.haserror as boolean,
            result: logEntry?.result as string,
            console: logEntry?.console as string,
            id: logEntry?.id as number[],
            updated_at: logEntry?.updated_at as string,

          }}  />
          
       
        </div>

  
    </>
  )
}


export  async function KoksmatAdmin({ params }: { params: { objectId: string } }) {
  const {client,token} = await getClient();
  // happends under build in Docker if the env variable is not set
  // impact is that the page is not pre-rendered
  if (token===NOAPPKEY){ 
    return null
  }
  const get = client.get 
  const { objectId } = params;
  const { data, error } = await get("/v1/admin/auditlogs/powershell/{objectId}", {
    cache:  "default", 
  
    params: {
      path: {
        objectId
      }
    },
  });

  if (error) {
    return <div>{error as string}</div>;
  }
  const logEntry = data?.powershellauditlog


  //const console = JSON.stringify(consoleHTML)
  const console = logEntry?.console as string
  return <div className="w-full">

    
    <div className="p-2">
      <div className="text-gray">
        Date time
      </div>
      <div>
        <input readOnly className="w-full" type="text" value={logEntry?.created_at} />

      </div>
    </div>
    <div className="p-2">
      <div className="text-gray">
        Tenant
      </div>
      <div>
        <input readOnly className="w-full" type="text" value={logEntry?.database} />

      </div>
    </div>
    <div className="p-2">
      <div className="text-gray">
        App
      </div>
      <div>
        <input readOnly className="w-full" type="text" value={logEntry?.appid} />

      </div>
    </div>
    <div className="p-2">

      <div >
        Script name
      </div>
      <div>
        <input readOnly className="w-full" type="text" value={logEntry?.scriptname} />

      </div>
    </div>

    <div className="p-2">
      <div className="text-gray">
        Parameters
      </div>
      <div>
        <input readOnly className="w-full" type="text" value={logEntry?.input} />

      </div>
    </div>


    <div className="p-2">
      <div className="text-gray">
        Has error?
      </div>
      <div>
        {logEntry?.haserror ? "Ran wih error" : "no"}

      </div>
    </div>

    <div className="p-2">
      <div>
        Result
      </div>
      <textarea readOnly className="h-40 w-full" value={logEntry?.result} />
    </div>

    <div className="p-2">
      <div>
        Console output
      </div>
      <textarea readOnly className="h-40 w-full" value={console} />
    </div>
  </div>
}
