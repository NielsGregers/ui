
import * as React from "react"
import { getUserSession } from "@/lib/user"
import { use } from "react";
export const GLOBALADMIN = "Global.Admin"

export type Modules = "PowerShell" 
| "Booking" 
| "Developer" 
| "Catering" 
| "News" 
| "PowerShellExchange" 
| "PowerShellPowerApps" 
| "PowerShellSharePoint" 


export type Roles = "User" | "Admin" 


export interface ModuleProps {
    children: React.ReactNode
    module: Modules
}
export interface RoleProps extends ModuleProps{
    
    role: Roles
}
   
async function getSession() {
    return getUserSession()
}

/**
 * 
 * @param role Name of role to check
 * @param module Name of module to check
 * @returns true if user has role access, else false
 */
export async function hasRole(role: Roles, module: Modules) : Promise<boolean> {
    const session = await getSession()
    if (!session) {
        return false
    }
    if (session?.roles?.includes(module+"."+role) || session?.roles?.includes(GLOBALADMIN)) {
        return true
      }

    return false
}

/**
 * 
 * @param module Name of module to check
 * @returns true if user has module access, else false
 */
export async function hasModule(module: Modules) : Promise<boolean> {
    const session = await getSession()
    const roleAdmin : Roles = "Admin"
    const roleUser : Roles = "User"
    if (session?.roles?.includes(module+"."+roleUser) ||session?.roles?.includes(module+roleAdmin) || session?.roles?.includes(GLOBALADMIN)) {
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
export function ForModule({ children, module }: ModuleProps) {
    const allow = use(hasModule(module))
    if (!allow) {
        return null
    }
    if (allow) {
        return  <>{children}</>
      }

    return null
    
       
    
}
