/* eslint-disable tailwindcss/classnames-order */
"use client"

import React, { useState } from "react"

import Countdown from "./countdown"
import CurrentTime from "./currentTime"
import LicencePlatesAdd from "./licencePlatesAdd"
import LogoBookingTool from "./logoBookingTool"

interface PropTypes {
  userName: string | undefined | null
  userEmail: string | undefined | null
}

function HomeScreen(props: PropTypes) {
  return (
    <div>
      <Countdown deadline={new Date("2023-10-06T17:00:00")} />
      <div className="min-h-[90vh] container flex flex-col gap-2 justify-center items-center">
        {/* <div className="text-3xl">Welcome, {props.userName}!</div> */}
        <div className="flex flex-col gap-2 justify-center content-center items-center">
          <LicencePlatesAdd
            deadline={new Date("2023-10-06T17:00:00")}
            userEmail={props.userEmail}
          />
        </div>{" "}
      </div>
      <div className="absolute bottom-0 left-0 mr-2 mb-2 p-3 md:mr-16 z-70">
        <LogoBookingTool />
      </div>
    </div>
  )
}

export default HomeScreen
