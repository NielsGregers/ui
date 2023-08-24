
import { use } from "react"
import { ProfileForm } from "./firsttime-profile-form"
import { getProfilingData } from "../getdata"
import { getUserSession } from "@/lib/user"
import { getprofile } from "../actions/profiling"
export const dynamic = 'force-dynamic'
export default async function SettingsProfilePage() {
  const data =  await getProfilingData()
  const session = await getUserSession()
  const upn =session?.user?.email ?? ""
  const existingProfile = await getprofile(upn)

  const country = existingProfile?.country ?? ""
  const unit = existingProfile?.unit ?? ""
  return (
    <div className="space-y-6">
      <ProfileForm  currentUnit={unit} currentCountry={country} {...data}/>
    </div>
  )
  
}
