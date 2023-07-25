import { getServerSession,DefaultSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface UserSession extends DefaultSession{
    roles?: any;
   
  }
  
  export interface User {
    name: string;
    email: string;
    image: string;
  }
export async function getUserSession() : Promise<UserSession | null>{

    const session  = await getServerSession(authOptions);
    if (! session) return null
    const userSession = session as UserSession
    return userSession
}

