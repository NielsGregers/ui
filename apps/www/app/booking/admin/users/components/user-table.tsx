import React, { use } from "react"

import { getAllUsers } from "@/app/booking/actions/parking/user"

import { DataTable } from "./user-data-table"
import { User, columns } from "./user-table-columns"

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return await getAllUsers()
  // return [
  //   {
  //     id: "1",
  //     name: "Karlo Mrakovčić",
  //     upn: "admin-kmrak@nets.eu",
  //     licenceplates: ["ZG-1234-AB", "ZG-5678-AB"],
  //   },
  //   // ...
  // ]
}

function UserTable() {
  const data = use(getData())

  return (
    <div className="mx-auto w-[50vw] py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default UserTable
