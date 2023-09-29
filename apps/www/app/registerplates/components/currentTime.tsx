"use client"

import React, { useEffect, useState } from "react"

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const formattedDate = currentTime.toLocaleDateString("en-GB", {
    weekday: "short",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })

  return (
    <div className="absolute right-0 mr-2 mt-3 p-3 md:mr-16">
      <div className="w-[120px] text-3xl" suppressHydrationWarning>
        {currentTime.toLocaleTimeString("en-GB")}
      </div>
      <div className="text-right">{formattedDate}</div>
    </div>
  )
}

export default CurrentTime
