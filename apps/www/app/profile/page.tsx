import Logo from "@/components/logo"

import { ValidateEmailAccountForm } from "./components/onboarding-form"

export const dynamic = "force-dynamic"

export default async function RedirectToLoggedinUse() {
  return (
    <div>
      <div className="">
        <div className=" flex h-screen w-screen place-items-center ">
          <div className="grow"></div>
          <div className="mt-4 overflow-hidden rounded-[0.5rem] border bg-background shadow">
            <div className="hidden space-y-6 p-10 pb-16 md:block">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Welcome</h2>
                <p className="text-muted-foreground">
                  We need to know your email address in order to give you
                  access.
                </p>
              </div>
              <hr />
              <ValidateEmailAccountForm />
            </div>
          </div>
          <div className="grow"></div>
        </div>
      </div>
    </div>
  )
}
