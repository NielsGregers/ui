
import Logo from "@/components/logo";
import { getUserSession } from "@/lib/user"
import { redirect } from "next/navigation";
import { ValidateEmailAccountForm } from "./components/profile-form";




export default async function RedirectToLoggedinUse() {
  const session = await getUserSession()

  if (session?.user?.email) {
    redirect("/profile/" + session?.user?.email)
  }

  return <div>

    <div className="h-screen w-full ">
      <div className="grid h-screen place-items-center">

        <div className="absolute left-8 top-4">
          <Logo homeUrl="/" />
        </div>
        <div >
          <div className=" p-10">
            <div >
              <div className="mt-4 overflow-hidden rounded-[0.5rem] border bg-background shadow">
                <div className="hidden space-y-6 p-10 pb-16 md:block">

                  <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Welcome</h2>
                    <p className="text-muted-foreground">
                      We need to know your email address in order to give you access.
                    </p>
                  </div>
                  <hr />
                  <ValidateEmailAccountForm />
                </div></div></div></div>

        </div>

      </div></div>


  </div>
}
