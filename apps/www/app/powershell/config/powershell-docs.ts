import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Exchange",
      href: "/powershell/exchange",
    },
    {
      title: "SharePoint",
      disabled: true,
      href: "/powershell/sharepoint",
    },
    {
      title: "PowerApps",
      disabled: true,
      href: "/powershell/powerapps",
    },
    {
      title: "Administration",
      href: "/powershell/admin",
    },
   
  
   
  ],
  sidebarNav: [
    {
      title: "Logs",
      items: [
        {
          title: "Audit",
          href: "/powershell/admin/logs/auditlog/mongo",
          items: [],
        },
       
      ],
    },

  ],

  
}
