import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Administration",
      href: "/booking/admin",
    },
   
  
   
  ],
  sidebarNav: [
    {
      title: "Logs",
      items: [
        {
          title: "Audit",
          href: "/booking/admin/logs/auditlog/mongo",
          items: [],
        },
       
      ],
    },

  ],
}
