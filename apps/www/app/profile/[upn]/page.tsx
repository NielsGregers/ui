
import { use } from "react"
import { ProfileForm } from "./components/firsttime-profile-form"

import { getUserSession } from "@/lib/user"
import { getprofile } from "../actions/profiling"
import { MyMemberships } from "./components/memberships"
export const dynamic = 'force-dynamic'
export default async function SettingsProfilePage() {

  const session = await getUserSession()
  const upn =session?.user?.email ?? ""
  const existingProfile = await getprofile(upn)

  const country = existingProfile?.country ?? ""
  const unit = existingProfile?.unit ?? ""
  return (
    <div className="space-y-6">
      <ProfileForm  currentUnit={unit} currentCountry={country} />
  
    </div>
  )
  
}
