import { siteConfig } from "@/config/site"
import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"
import { ForRole } from "@/components/roles"

export function SiteFooter() {
  return (
    <footer className="place-items-center py-6 md:px-8 md:py-0 ">
      <div className=" flex flex-col  justify-between gap-4 md:h-24 md:flex-row ">
        <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
<div className="flex">

          <ForRole role="Admin" module="UserProfiles">
            
            <div>
              <div>
                Admin:
              </div>
              <Button variant="link">
                <Link href="/profile/admin" >Admin</Link>
              </Button>
            </div>
            <div>
              <div>
                Profile  lists:
              </div>
              <Button variant="link">
                <Link href="https://christianiabpos.sharepoint.com/sites/nexiintra-home/Lists/News%20Channels" target="_blank">News Channels</Link>
              </Button>
              <Button variant="link">
                <Link href="https://christianiabpos.sharepoint.com/sites/nexiintra-home/Lists/News%20Categories" target="_blank">News Categories</Link>
              </Button>
              <Button variant="link">
                <Link href="https://christianiabpos.sharepoint.com/sites/nexiintra-home/Lists/Valid%20Guest%20Domains" target="_blank">Valid Guest Domains</Link>
              </Button>
              <Button variant="link">
                <Link href="https://christianiabpos.sharepoint.com/sites/nexiintra-home/Lists/Countries" target="_blank">Countries</Link>
              </Button>
              <Button variant="link">
                <Link href="https://christianiabpos.sharepoint.com/sites/nexiintra-home/Lists/Units" target="_blank">Units</Link>
              </Button>
              <Button variant="link">
                <Link href="https://christianiabpos.sharepoint.com/sites/nexiintra-home/Lists/Profiles" target="_blank">Profiles</Link>
              </Button>
            </div>
          </ForRole>

          </div>
        </div>
      </div>
    </footer>
  )
}
