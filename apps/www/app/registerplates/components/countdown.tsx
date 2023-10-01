"use client"

import React, { useEffect, useState } from "react"

interface PropTypes {
  deadline: Date
}

interface TimeDifference {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function Countdown(props: PropTypes) {
  const [timeLeft, setTimeLeft] = useState<TimeDifference>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      let diff = props.deadline.getTime() - new Date().getTime()
      let days =
        Math.floor(diff / (1000 * 60 * 60 * 24)) < 0
          ? 0
          : Math.floor(diff / (1000 * 60 * 60 * 24))
      let hours =
        Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 0
          ? 0
          : Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let minutes =
        Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)) < 0
          ? 0
          : Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      let seconds =
        Math.floor((diff % (1000 * 60)) / 1000) < 0
          ? 0
          : Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ days, hours, minutes, seconds })
      setloading(false)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div>
      {!loading && (
        <div
          className={`absolute right-0 mr-2 mt-3 p-3 md:mr-16 ${
            timeLeft.days < 1
              ? "text-red-800"
              : timeLeft.days < 2
              ? "text-orange-400"
              : "text-black"
          }`}
        >
          <div>Time left:</div>
          <div
            className={`w-60 text-3xl ${
              timeLeft.days < 1
                ? "text-red-800"
                : timeLeft.days < 2
                ? "text-orange-400"
                : "text-black"
            }`}
            suppressHydrationWarning
          >
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
            {timeLeft.seconds}s
          </div>
        </div>
      )}
    </div>
  )
}

export default Countdown
