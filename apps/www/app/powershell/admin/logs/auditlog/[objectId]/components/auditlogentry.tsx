import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"


export function AuditlogDetails({ params }: { params: {
  appid: string ,
  console: string ,
  created_at: string ,
  database: string,
  scriptname: string ,
  input: string ,
  result: string ,
  haserror: boolean ,
  id: number[] ,
 
  updated_at: string }
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log Details</CardTitle>
        <CardDescription>
         This shows you the details of a single audit log entry
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
      <div className="flex items-center justify-between space-x-4">
      <div className="w-full bg-slate-100 p-2">

    
<div className="p-2">
  <div className="text-gray">
    Date time
  </div>
  <div>
    <input readOnly className="w-full" type="text" value={params.created_at} />

  </div>
</div>
<div className="p-2">
  <div className="text-gray">
    Tenant
  </div>
  <div>
    <input readOnly className="w-full" type="text" value={params.database} />

  </div>
</div>
<div className="p-2">
  <div className="text-gray">
    App
  </div>
  <div>
    <input readOnly className="w-full" type="text" value={params.appid} />

  </div>
</div>
<div className="p-2">

  <div >
    Script name
  </div>
  <div>
    <input readOnly className="w-full" type="text" value={params.scriptname} />

  </div>
</div>

<div className="p-2">
  <div className="text-gray">
    Parameters
  </div>
  <div>
    <input readOnly className="w-full" type="text" value={params.input} />

  </div>
</div>


<div className="p-2">
  <div className="text-gray">
    Has error?
  </div>
  <div>
    {params.haserror ? "Ran wih error" : "no"}

  </div>
</div>

<div className="p-2">
  <div>
    Result
  </div>
  <textarea readOnly className="h-40 w-full" value={params.result} />
</div>

<div className="p-2">
  <div>
    Console output
  </div>
  <textarea readOnly className="h-40 w-full" value={params.console} />
</div>
</div>
        </div>
        
      </CardContent>
    </Card>
  )
}
