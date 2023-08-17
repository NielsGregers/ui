"use client";

import { useEffect, useState } from "react";
import { ProfileContext ,ProfileUseCases} from "./usecasecontext";
import { useCookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';
import { Country, Unit } from "@/app/welcome/schema";
type Props = {
 
  children?: React.ReactNode;
  countries: Country[];
  units: Unit[];
};

export const UsecaseProvider = (props: Props)  => {
  const [countries, setcountries] = useState(props.countries)
  const [units, setunits] = useState(props.units)
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [selectedCountry, setselectedCountry] = useState(cookies.user?.country)
  const [selectedUnit, setselectedUnit] = useState(cookies.user?.unit)
  useEffect(() => {
    console.log('Cookies: ', cookies);
    if (cookies.user) {
      setselectedCountry(cookies.user?.country);
      setselectedUnit(cookies.user?.unit);
    }
  }, [cookies]);

  const usecases: ProfileUseCases = {
    Select: function (country: string, unit: string): void {
      setselectedCountry(country);
      setselectedUnit(unit);
      setCookie('user', { country, unit }, { path: '/' });
      window.open("/load", "_self");
    },

    country: selectedCountry,
    unit: selectedUnit,
    countries,
    units
  }
  return <CookiesProvider>
    <ProfileContext.Provider value={usecases}>
      {props.children}
    </ProfileContext.Provider>
  </CookiesProvider>

    ;
};
