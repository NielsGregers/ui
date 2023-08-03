"use client"
import { createContext } from "react";
export type  PersonalisationUseCases= {
  Select: (country: string,unit: string) => void;
  
  country:string
  unit:string

}
export const UsecaseContext = createContext<PersonalisationUseCases>({
  Select: () => { },
  country: "",
  unit: ""
});


