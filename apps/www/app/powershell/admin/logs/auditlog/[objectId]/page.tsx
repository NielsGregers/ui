import Image from "next/image"
import { AuditlogDetails } from "./components/auditlogentry"
import { ObjectId } from "mongodb";
import { connect } from "@/lib/mongodb";
import ToSmall from "@/components/tosmall";

export const metadata = {
  title: 'Auditlog PowerShell details',
}

export  default async function CardsPage({ params }: { params: { objectId: string } }) {
const filter = {
  '_id': new ObjectId(params.objectId)
};
const projection = {
 
};
const sort = {
 
};
const limit = 1;

const client = await connect();
const coll = client.db('magicbox').collection('audit_log');
const cursor = coll.find(filter, { projection, sort, limit });
const result = await cursor.toArray();
const data = result[0];
await client.close();
  const logEntry = data

  return (
    <>
     <ToSmall/>
    
        <div className="col-span-5 grid items-start gap-6 p-10 lg:col-span-1">
         
          <AuditlogDetails params={{
       
            created_at: logEntry?.created_at as string,
            database: logEntry?.database as string,
            appid: logEntry?.appid as string,
            scriptname: logEntry?.scriptname as string,
            input: logEntry?.input as string,
            script: logEntry?.scriptsrc as string,
            haserror: logEntry?.haserror as boolean,
            result: logEntry?.output as string,
            console: logEntry?.console as string,
            id: logEntry?.id as number[],
            updated_at: logEntry?.updated_at as string,

          }}  />
          
       
        </div>

  
    </>
  )
}


