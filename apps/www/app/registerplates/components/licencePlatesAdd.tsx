import React, { useEffect, useState } from "react"
import { ThreeCircles } from "react-loader-spinner"

import { Button } from "@/registry/default/ui/button"
import { Input } from "@/registry/default/ui/input"

import { addUserPlates, getUserPlates } from "../actions/user"

interface PropTypes {
  userEmail: string | undefined | null
  deadline: Date
}

function LicencePlatesAdd(props: PropTypes) {
  const [input, setinput] = useState("")
  const [loading, setloading] = useState(true)
  const [timeUp, settimeUp] = useState(false)
  const [editMode, seteditMode] = useState<boolean>(false)
  const [refresh, setrefresh] = useState<number>(0)
  const [existingPlates, setexistingPlates] = useState<boolean>(false)

  useEffect(() => {
    async function fetchMyPlates() {
      const result = await getUserPlates(props.userEmail ?? "")
      if (result.length > 0) {
        setinput(result[0])
        setexistingPlates(true)
      }
      setloading(false)
    }

    if (props.userEmail != null && props.userEmail != undefined) fetchMyPlates()
  }, [props.userEmail, refresh])

  useEffect(() => {
    const intervalId = setInterval(() => {
      let currentTime = new Date()
      let diff = props.deadline.getTime() - currentTime.getTime()
      if (diff < 0) {
        settimeUp(true)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div>
      {loading && (
        <div className="flex flex-col items-center justify-center">
          <ThreeCircles
            height="100"
            width="100"
            color="#2D32AA"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      )}
      {!loading && (
        <div className="flex w-[90vw] flex-col items-center justify-center rounded-xl  bg-black bg-opacity-5 p-7 dark:bg-white dark:bg-opacity-5 md:w-[60vw]">
          <div>
            {!timeUp && (
              <div className="text-center text-4xl">
                {existingPlates
                  ? "Thank you for your input!"
                  : "Please provide your input"}
              </div>
            )}
            {timeUp && (
              <div className="text-center text-4xl text-gray-800">
                Time is up!
              </div>
            )}
            {!timeUp && (
              <div className="text-md pt-4 text-center italic">
                {existingPlates
                  ? ""
                  : "In order to be able to reserve parking in the new Matrix building, we need to know your licence plate number."}
              </div>
            )}
            {timeUp && (
              <div className="text-md pt-4 text-center italic">
                Sorry, you can no longer change your input.
              </div>
            )}
            {!timeUp && (
              <div className="text-md pt-4 text-center italic">
                {existingPlates
                  ? "You still have time to change it!"
                  : "Please enter your licence plate number:"}
              </div>
            )}
            {timeUp && (
              <div className="text-md pt-4 text-center italic">Your input:</div>
            )}
          </div>
          <div className="flex max-w-sm items-center space-x-2 pt-4">
            <Input
              disabled={timeUp || (existingPlates && !editMode)}
              type="text"
              className="uppercase"
              value={input}
              onChange={(e) => setinput(e.target.value)}
            />
            {(!existingPlates || editMode) && !timeUp && (
              <Button
                type="submit"
                onClick={() => {
                  setloading(true)
                  addUserPlates(props.userEmail ? props.userEmail : "", [
                    input.toUpperCase(),
                  ])
                  seteditMode(false)
                  setrefresh(refresh + 1)
                }}
              >
                Submit
              </Button>
            )}
            {existingPlates && !editMode && !timeUp && (
              <Button
                type="button"
                onClick={() => {
                  seteditMode(true)
                }}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LicencePlatesAdd
