import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface UserSession {
    user: User;
  }
  
  export interface User {
    name: string;
    email: string;
    image: string;
  }
export async function getUserSession() : Promise<UserSession>{

    const session = await getServerSession(authOptions);
    return session as UserSession;
}

