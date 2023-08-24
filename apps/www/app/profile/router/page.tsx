

import { getUserSession } from "@/lib/user"
import { redirect } from "next/navigation";



export const dynamic = 'force-dynamic'

export default async function RedirectToLoggedinUse() {
  const session = await getUserSession()

  if (session?.user?.email) {
     redirect("/profile/" + session?.user?.email)
   }else
    {redirect("/profile")}


  return <div>



  </div>
}
