
import { getUserSession } from "@/lib/user"
import { redirect } from "next/navigation";



export default async function RedirectToLoggedinUse() {
  const session = await getUserSession()
  const email = session?.user?.email ? session?.user?.email :""
  redirect("/profile/"+email)
  return null
}
