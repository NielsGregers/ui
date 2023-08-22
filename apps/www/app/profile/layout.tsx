import { UsecaseProvider } from "./usecaseproviders";

import { getProfilingData } from "./getdata"
interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const data  = await getProfilingData();
  return (
    <UsecaseProvider  {...data}>
      {children}
    </UsecaseProvider>
  )
}
