import { siteConfig } from "@/config/site"
import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"
import { ForRole } from "@/components/roles"

export function SiteFooter() {
  return (
    <footer className="place-items-center py-6 md:px-8 md:py-0 ">
      <div className=" flex flex-col  justify-between gap-4 md:h-24 md:flex-row ">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
       
     
          <ForRole role="Admin" module="UserProfiles">
            <Button variant="link">
              <Link href="https://christianiabpos.sharepoint.com/sites/nexiintra-home/_layouts/15/viewlsts.aspx?view=14" target="_blank">SharePoint lists</Link>
            </Button>
          </ForRole>
          
            
        </p>
      </div>
    </footer>
  )
}
