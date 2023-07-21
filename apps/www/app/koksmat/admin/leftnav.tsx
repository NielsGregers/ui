import Link from "next/link";

export default function LeftNavAdmin(){
    // eslint-disable-next-line tailwindcss/classnames-order
    return  <div className="w-40 bg-zinc-500 text-white h-screen">
   
    <div className='mt-11 p-2'>
        <Link href="/koksmat/admin/auditlog">Audit Logs</Link>
    </div>
    </div>


}