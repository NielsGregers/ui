/* eslint-disable tailwindcss/classnames-order */
"use client"

import React, { useState } from "react"

import CurrentTime from "./currentTime"

interface PropTypes {
  userEmail: string | undefined | null
}

function HomeScreen(props: PropTypes) {
  return (
    <div>
      <CurrentTime />
      <div className="min-h-[90vh] container flex flex-col gap-2 justify-center">
        Home screen
      </div>
    </div>
  )
}

export default HomeScreen
