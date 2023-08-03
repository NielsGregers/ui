
"use client"
import { useContext } from "react";
import { UsecaseContext } from "../usecasecontext"

export default  function Status(  ) {


    const usecases = useContext(UsecaseContext);
    return <div className="mx-1">

<div className="p-10">
      {usecases.country}
      </div>
      <div className="p-10">
      {usecases.unit}
      </div>

    </div>
}
