
import * as React from "react"
import { getUserSession } from "@/lib/user"
import { use } from "react";

export type Modules = "PowerShell" 
| "Booking" 
| "Developer" 
| "PowerShellExchange" 
| "PowerShellPowerApps" 
| "PowerShellSharePoint" 


export type Roles = "User" | "Admin" 



export interface RoleProps {
    children: React.ReactNode
    role: Roles
    module: Modules
}
async function getSession() {
    return getUserSession()
}

export async function hasRole(role: Roles, module: Modules) : Promise<boolean> {
    const session = await getSession()
    if (!session) {
        return false
    }
    if (session?.roles.includes(module+"."+role) || session?.roles.includes("Global.Admin")) {
        return true
      }

    return false
}
/**
 * 
 * @param role Name of role to check
 * @param children Children to render if role matches
 * @param module Name of module to check 
 * @returns if roles match, return children, else return null
 */
export function ForRole({ children, role,module }: RoleProps) {
    const allow = use(hasRole(role,module))
    if (!allow) {
        return null
    }
    if (allow) {
        return  <>{children}</>
      }

    return null
    
       
    
}

/**
 * 
 * @param children Children to render if role matches
 * @param module Name of module to check 
 * @returns if roles match, return children, else return null
 */
export function ForModule({ children, module }: RoleProps) {
    const allow = use(hasRole("User",module)) || use(hasRole("Admin",module))
    if (!allow) {
        return null
    }
    if (allow) {
        return  <>{children}</>
      }

    return null
    
       
    
}
