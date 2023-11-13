import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig  = (tenant:string,site:string,workspace:string) : DocsConfig =>  {return {
  mainNav: [
    {
      title: "Workspace",
      href: `/koksmat/${tenant}/${site}/kitchen/${workspace}`,
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
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: `/koksmat/${tenant}/${site}/kitchen/${workspace}`,
          items: [],
        },
        {
          title: "Connect",
          href: `/koksmat/${tenant}/${site}/kitchen/${workspace}/connect`,
          items: [],
        },

        
      ],
    },
    {
      title: "Cook",
      items: [
       
        {
          title: "Kitchen Tickets",
          href: `/koksmat/${tenant}/${site}/kitchen/${workspace}/github`,
          items: [],
        }, 
        {
          title: "Code",
          href: `/koksmat/${tenant}/${site}/kitchen/${workspace}/code`,
          items: [],
        },
     
        {
          title: "Build",
          disabled: true,
          href: `/koksmat/${tenant}/${site}/kitchen/${workspace}/build`,
          items: [],
        },
        {
          title: "Ship",
          disabled: true,
          href: `/koksmat/${tenant}/${site}/kitchen/${workspace}/ship`,
          items: [],
        },   
 
      ],
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
