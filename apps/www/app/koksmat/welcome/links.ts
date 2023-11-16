import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig  = (tenant:string,site:string,workspace:string) : DocsConfig =>  {return {
  mainNav: [
    {
      title: "Workspace",
      href: `/koksmat/tenants/${tenant}/site/${site}/kitchen/${workspace}`,
    },
    {
      title: "Components",
      href: "/shadcn/docs/components/accordion",
    },
    {
      title: "Examples",
      href: "/examples",
    },
    {
      title: "Figma",
      href: "/shadcn/docs/figma",
    },
    {
      title: "GitHub",
      href: "https://github.com/shadcn/ui",
      external: true,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/shadcn",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting started",
      items: [
        {
          title: "Introduction",
          href: `/koksmat/welcome`,
          items: [],
        },
        {
          title: "Connect to Azure",
          href: `/koksmat/welcome/connect`,
          items: [],
        },
        {
          title: "Connect to SharePoint",
          href: `/koksmat/welcome/sharepoint`,
          items: [],
        },
        
      ],
    },
    {
      title: "Takeaways",
      items: [
       
        {
          title: "SharePoint Branding",
          href: `/koksmat/solution/icing`,
          items: [],
        }, 
        
 
      ]
    },
    {
      title: "Finer food",
      items: [
       
        {
          title: "Channel management",
          href: `/koksmat/solution/icing`,
          items: [],
        }, 
        
 
      ]
    },
    // {
    //   title: "Installation",
    //   items: [
    //     {
    //       title: "SharePoint Extention",
    //       href: "/shadcn/docs/installation/next",
    //       items: [],
    //     },
    //     {
    //       title: "Outlook",
    //       href: "/shadcn/docs/installation/vite",
    //       items: [],
    //     },
    //     {
    //       title: "Teams",
    //       href: "/shadcn/docs/installation/remix",
    //       items: [],
    //     },
    //     {
    //       title: "Kubernetes",
    //       href: "/shadcn/docs/installation/gatsby",
    //       items: [],
    //     },
    //     {
    //       title: "Exchange Administration",
    //       href: "/shadcn/docs/installation/astro",
    //       items: [],
    //     },
    //     {
    //       title: "SharePoint Administration",
    //       href: "/shadcn/docs/installation/manual",
    //       items: [],
    //     },
    //     {
    //       title: "PowerApps & Automate Administration",
    //       href: "/shadcn/docs/installation/manual",
    //       items: [],
    //     },
    //   ],
    // },
   
   
      
    
  ],
}}
