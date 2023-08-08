"use client";

import { useEffect, useState } from "react";
import { UsecaseContext, PersonalisationUseCases } from "./usecasecontext";
import { useCookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';
type Props = {
  children?: React.ReactNode
};

export const UsercaseProvider = ({ children }: Props) => {
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

  const usecases: PersonalisationUseCases = {
    Select: function (country: string, unit: string): void {
      setselectedCountry(country);
      setselectedUnit(unit);
      setCookie('user', { country, unit }, { path: '/' });
      window.open("/load", "_self")
    },

    country: selectedCountry,
    unit: selectedUnit
  }
  return <CookiesProvider>
    <UsecaseContext.Provider value={usecases}>
      {children}
    </UsecaseContext.Provider>
  </CookiesProvider>

    ;
};
