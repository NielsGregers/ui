import { UsercaseProvider } from "./usecaseproviders";

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <UsercaseProvider>
      <div className="h-screen w-screen">
      <div className="flex h-screen flex-row">
        <div className="flex-grow bg-transparent blur-md"></div>
        <div className="w-[500px] bg-gray-200 transition-transform delay-150 ease-in-out">
      {children}
     
      </div></div>
     
    </div>
     </UsercaseProvider>
  )
}
