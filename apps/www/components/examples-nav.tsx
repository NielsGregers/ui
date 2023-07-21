"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area"

const examples = [
  {
    name: "Dashboard",
    href: "/shadcn/examples/dashboard",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/shadcn/examples/dashboard",
  },
  {
    name: "Cards",
    href: "/shadcn/examples/cards",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/shadcn/examples/cards",
  },
  {
    name: "Tasks",
    href: "/shadcn/examples/tasks",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/shadcn/examples/tasks",
  },
  {
    name: "Playground",
    href: "/shadcn/examples/playground",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/shadcn/examples/playground",
  },
  {
    name: "Forms",
    href: "/shadcn/examples/forms",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/shadcn/examples/forms",
  },
  {
    name: "Music",
    href: "/shadcn/examples/music",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/shadcn/examples/music",
  },
  {
    name: "Authentication",
    href: "/shadcn/examples/authentication",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/shadcn/examples/authentication",
  },
]

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const pathname = usePathname()

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {examples.map((example) => (
            <Link
              href={example.href}
              key={example.href}
              className={cn(
                "flex items-center px-4",
                pathname?.startsWith(example.href)
                  ? "font-bold text-primary"
                  : "font-medium text-muted-foreground"
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      <ExampleCodeLink
        pathname={pathname === "/" ? "/shadcn/examples/dashboard" : pathname}
      />
    </div>
  )
}

interface ExampleCodeLinkProps {
  pathname: string | null
}

export function ExampleCodeLink({ pathname }: ExampleCodeLinkProps) {
  const example = examples.find((example) => pathname?.startsWith(example.href))

  if (!example?.code) {
    return null
  }

  return (
    <Link
      href={example?.code}
      target="_blank"
      rel="nofollow"
      className="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
    >
      View code
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  )
}
