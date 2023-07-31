import { UsercaseProvider } from "./usecaseproviders";

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <UsercaseProvider>
      {children}
      </UsercaseProvider>
  )
}
