"use client"
import { createContext } from "react";
export interface Session {
  user: User;
  expires: string;
  roles: string[];
  accessToken: string;
}

export interface User {
  name: string;
  email: string;
  image: string;
}


export type  MagicboxContextType= {
  session?:Session

}
export const MagicboxContext = createContext<MagicboxContextType>({session:{user:{name:"",email:"",image:""},expires:"",roles:[],accessToken:""}});


