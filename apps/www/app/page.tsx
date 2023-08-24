import Logo from "@/components/logo"

export default function WelcomePage() {

  return (

    <div className="-space  container h-screen  bg-[url('/NexiEurope.svg')] bg-cover text-center">
      <div className="absolute left-8 top-4">
        <Logo homeUrl="/" />
      </div>

      <div className="grid h-screen place-items-center">
        <div className=" w-screen bg-[#FFFFFFAA] p-10">
          <div className="pb-4 text-2xl text-black">Welcome to Nexi Group</div>
          <div>
            <button className="rounded-full bg-[#2D32A9] px-10 text-white">
              {" "}
              <a href="/profile">Click to get started</a>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
