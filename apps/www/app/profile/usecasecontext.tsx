"use client"
import { createContext } from "react";

import { Country, Unit } from "@/app/welcome/schema";

export type  ProfileUseCases= {
  Select: (country: string,unit: string) => void;
  
  country:string
  unit:string
  countries: Country[];
  units: Unit[];

}
export const ProfileContext = createContext<ProfileUseCases>({
  Select: () => { },
  country: "",
  unit: "",
  countries: [],
  units: []
});



