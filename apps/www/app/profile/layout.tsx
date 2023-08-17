import { UsecaseProvider } from "./usecaseproviders";

import { getProfilingData } from "@/app/welcome/getdata"
interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const { countries, units } = await getProfilingData();
  return (
    <UsecaseProvider countries={countries} units={units}>
      {children}
    </UsecaseProvider>
  )
}
