import { ForRole } from "@/components/roles"
import { siteConfig } from "@/config/site"
import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"
export function SiteFooter() {
  return (
    <footer className="place-items-center py-6 md:px-8 md:py-0 ">
    <div className=" flex flex-col  justify-between gap-4 md:h-24 md:flex-row ">
      <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
<div className="flex">

        <ForRole role="Admin" module="Catering">
          
          <div>
            <div>
              Admin:
            </div>
            <Button variant="link">
              <Link href="/cava/admin/orders" >Order Administration</Link>
            </Button>
          </div>
          <div>
            <div>
             SharePoint lists:
            </div>
            <Button variant="link">
              <Link href="https://christianiabpos.sharepoint.com/sites/cava3/Lists/Catering%20Orders" target="_blank">Sales Orders</Link>
            </Button>
            <Button variant="link">
              <Link href="https://christianiabpos.sharepoint.com/sites/cava3/Lists/Catering%20Providers" target="_blank">Providers</Link>
            </Button>
            {/* <Button variant="link">
              <Link href="https://christianiabpos.sharepoint.com/sites/cava3/Lists/Companies" target="_blank">Companies</Link>
            </Button> */}
            <Button variant="link">
              <Link href="https://christianiabpos.sharepoint.com/sites/cava3/Lists/Countries" target="_blank">Countries</Link>
            </Button>
            <Button variant="link">
              <Link href="https://christianiabpos.sharepoint.com/sites/cava3/Lists/Currency" target="_blank">Currency</Link>
            </Button>
            <Button variant="link">
              <Link href="https://christianiabpos.sharepoint.com/sites/cava3/Lists/ItemGroups" target="_blank">Item Groups</Link>
            </Button>    
            <Button variant="link">
              <Link href="https://christianiabpos.sharepoint.com/sites/cava3/Lists/Items" target="_blank">Items</Link>
            </Button>         
             {/* <Button variant="link">
              <Link href="https://christianiabpos.sharepoint.com/sites/cava3/Lists/Catering%20Orders%20Work%20Orders" target="_blank">Work Orders</Link>
            </Button> */}
            <Button variant="link">
              <Link href="https://christianiabpos.sharepoint.com/sites/cava3/Lists/Catering%20Orders%20Items" target="_blank">Catering Orders Items</Link>
            </Button>
            <Button variant="link">
              <Link href="https://christianiabpos.sharepoint.com/sites/cava3/Lists/Rooms" target="_blank">Rooms</Link>
            </Button>
          </div>
        </ForRole>

        </div>
      </div>
    </div>
  </footer>
  )
}
