
import Link from "next/link";
import Logo from "@/components/logo";


export default function Home() {
  return (
    <div className="-space  container h-screen  bg-[url('/NexiEurope.svg')] bg-cover text-center">
      <div className="absolute left-8 top-4">
        <Logo homeUrl="/" />
      </div>
      {/* <TopNavigation {...topNavigationProps} /> */}
      <div className="grid h-screen place-items-center">
        <div className=" w-screen bg-[#FFFFFFAA] p-10">
          <div className="pb-4 text-2xl text-black">Welcome to Nexi Group</div>
          <div>
            <button className="rounded-full bg-[#2D32A9] from-green-400 to-blue-500 p-2 px-10 text-white hover:from-pink-500 hover:to-yellow-500">
              {" "}
              <Link href="/welcome">Click to get started</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
