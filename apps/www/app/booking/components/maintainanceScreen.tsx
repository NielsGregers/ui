import React from "react"

function MaintainanceScreen() {
  return (
    <div className="flex h-[91vh] w-[98.5vw] flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-xl bg-black bg-opacity-5 p-7 dark:bg-white dark:bg-opacity-5">
        <div className="text-center text-4xl text-gray-800 dark:text-white">
          Welcome to Nexi booking solution
        </div>
        <div className="pt-4 text-center text-xl italic">
          The app will soon be available
        </div>
        <div className="pt-4 text-center text-xl italic">
          Please check back later
        </div>
      </div>
    </div>
  )
}

export default MaintainanceScreen
