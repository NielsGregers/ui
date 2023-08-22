"use client"
import { createContext } from "react";

import { Country, Unit } from "./schemas/welcome";
import { NewsChannel } from "./schemas/NewsChannelSchema";

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



