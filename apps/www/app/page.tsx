import Logo from "@/components/logo"
import "./home-animations.css"
export default function WelcomePage() {

  return (

    <div className="-space  container h-screen  bg-[url('/NexiEurope.svg')] bg-cover text-center">
      <div className="absolute left-8 top-4">
        <Logo homeUrl="/" />
      </div>

      <div className="grid h-screen place-items-center">
        <div className="home_welcome_animate mx-auto  rounded-xl bg-[#2D32A9] p-10">
          <div className="pb-4 text-2xl text-white">Welcome to Nexi Group</div>
          <div>
            <button  className="rounded-full bg-[#FFFFFF] px-10 text-[#2D32A9] ">
              {" "}
              <a href="/profile">Click to get started</a>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
