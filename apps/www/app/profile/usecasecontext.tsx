"use client"
import { createContext } from "react";

import { Country, Unit } from "@/app/welcome/schema";
import { NewsChannel } from "../news/schema";

export type  ProfileUseCases= {
  Select: (country: string,unit: string) => void;
  
  country:string
  unit:string
  countries: Country[];
  units: Unit[];
  newsChannels : NewsChannel[]

}
export const ProfileContext = createContext<ProfileUseCases>({
  Select: () => { },
  country: "",
  unit: "",
  countries: [],
  units: [],
  newsChannels:[]
});



