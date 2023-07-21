import Link from "next/link";
import { NOAPPKEY } from "../../../../constants";
import { getClient } from "../../../../getClient";




export const metadata = {
    title: 'Auditlog ',
    
  }
  

export default async function KoksmatAdmin({ params }: { params: { type: string,date: string,hour: string } }) {
  const {client,token} = await getClient();
  // happends under build in Docker if the env variable is not set
  // impact is that the page is not pre-rendered
  if (token===NOAPPKEY){ 
    return null
  }
  const get = client.get 
    const {date,hour,type} = params;


    const { data, error } = await get("/v1/admin/auditlogs/date/{date}/{hour}", {
      next: { revalidate: 60 } ,
      params: {
        path: {
            date,
            hour,
        }
      },
    });
  
    if (error) {
      return <div>{error as string}</div>;
    }
 return <div>

Audit Log Entries (PREVIEW) {params.type} {params.date} {params.hour}

{data?.auditlogs?.map((item, id) => {
    return <div key={id}>
        <div><a href={"/koksmat/admin/auditlog/"+item.id}>{item.scriptname}</a></div>
    </div>;} )}

 </div>
}
