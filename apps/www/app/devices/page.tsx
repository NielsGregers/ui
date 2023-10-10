"use client"

import { useContext, useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Document, WithId } from "mongodb"

import { GenericTable } from "@/components/table"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { GenericItem } from "@/components/table/data/schema"
import { Button } from "@/registry/new-york/ui/button"

import { Device, readDevices, snapshotDevices } from "."
import { MagicboxContext } from "../magicbox-context"
import { de } from "date-fns/locale"
import { format, subDays, differenceInCalendarDays, set } from "date-fns"

const status: {
  loading: boolean
} = {
  loading: false,
}


interface KPIProps {
  name: string
  numerator: string
  denominator: string
  numeratorValue: number | undefined
  denominatorValue: number | undefined
  comments?: string
}
function KPI({ name, numerator, numeratorValue, denominator, denominatorValue,comments }: KPIProps) {
  return <div className="flex">
    <div className="w-[100px] text-2xl">{name}</div>
    <div className="flex">
      
      <div className="my-2 mr-4 w-[100px] text-right text-2xl">{numeratorValue ?? "..."}</div>
      <div className=" w-[300px]"><div>{numerator}</div>
      <div className="text-xs">{comments}</div></div>
    </div>
    {denominator &&
      <div className="flex">
        
        <div className="my-2  mr-4 w-[100px] text-right text-2xl">{denominatorValue ?? "..."}</div>
        <div className=" w-[300px] ">{denominator}</div>
      </div>}


  </div>
}
export default function Devices() {
  const magicbox = useContext(MagicboxContext)
  const [deviceData, setdeviceData] = useState<Device[]>([])
  const [viewData, setViewData] = useState<GenericItem[]>([])
  const [numberOfItemsRead, setnumberOfItemsRead] = useState(0)
  const [isWorking, setisWorking] = useState(false)
  const [isloaded, setisloaded] = useState(false)
  const [errormessage, seterrormessage] = useState("")

  const [totalWorkstations, settotalWorkstations] = useState<number | undefined>()
  const [totalMobiles, settotalMobiles] = useState<number | undefined>()
  const [workstationsWithAntivirus, setworkstationsWithAntivirus] = useState<number | undefined>()
  const [workstationsWithAntiMalware, setworkstationsWithAntiMalware] = useState<number | undefined>()
  const [mobilesWithActiveMDMsegregation, setmobilesWithActiveMDMsegregation] = useState<number | undefined>()
  const [workstationsWithDLPmonitored, setworkstationsWithDLPmonitored] = useState<number | undefined>()
  const [workstationswithsystemssoftwareuptodateaatmonthminus11, setworkstationswithsystemssoftwareuptodateaatmonthminus11] = useState<number | undefined>()
  const [userswithusbWithEncryptionenabled, setuserswithusbWithEncryptionenabled] = useState<number | undefined>()
  const [userswithusbWithoutEncryptionenabled, setuserswithusbWithoutEncryptionenabled] = useState<number | undefined>()
  const [SPAMMailofpreviousmonth, setSPAMMailofpreviousmonth] = useState<number | undefined>()
  const [workstationsprotectedbyencryptiontool, setworkstationsprotectedbyencryptiontool] = useState<number | undefined>()
  const [view, setview] = useState<"kpi"|"devices">("kpi")
const [filter, setfilter] = useState("")


  function isMobile(device: Device): boolean {

    if (device.operatingSystem.toLowerCase() === "android") return true
    if (device.operatingSystem.toLowerCase() === "androidenterprise") return true
    if (device.operatingSystem.toLowerCase() === "androidforwork") return true
    if (device.operatingSystem.toLowerCase() === "ios") return true
    if (device.operatingSystem.toLowerCase() === "ipad") return true
    if (device.operatingSystem.toLowerCase() === "iphone") return true
    return false
  }


  function isMac(device: Device): boolean {
    if (device.operatingSystem.toLowerCase() === "macos") return true

    return false
  }
  function isWindows(device: Device): boolean {
    if (device.operatingSystem.toLowerCase() === "windows") return true

    return false
  }

  function calcKPI() {
    if (deviceData.length === 0) return
    const deviceOs = ["windows", "macos"]

    setworkstationsWithAntivirus(-1)
    setworkstationsWithDLPmonitored(-1)
    setworkstationsWithAntiMalware(-1)
    setmobilesWithActiveMDMsegregation(deviceData.filter((device) => {
      // if (differenceInCalendarDays(new Date(), new Date(device.approximateLastSignInDateTime)) > 45) return false

     if (!isMobile(device)) return false

      return device.isManaged
    }).length)

    setuserswithusbWithEncryptionenabled(-1)
    setuserswithusbWithoutEncryptionenabled(-1)
    setSPAMMailofpreviousmonth(3346815)
    setworkstationsprotectedbyencryptiontool(-1)

    setworkstationswithsystemssoftwareuptodateaatmonthminus11(deviceData.filter((device) => {
      // if (differenceInCalendarDays(new Date(), new Date(device.approximateLastSignInDateTime)) > 45) return false

      if (device.operatingSystem.toLowerCase() === "windows") return true
      if (device.operatingSystem.toLowerCase() === "macos") return true

      return false
    }).length)

    settotalWorkstations(deviceData.filter((device) => {
      // if (differenceInCalendarDays(new Date(), new Date(device.approximateLastSignInDateTime)) > 45) return false

      if (device.operatingSystem.toLowerCase() === "windows") return true
      if (device.operatingSystem.toLowerCase() === "macos") return true
      return false
    }).length)

    settotalMobiles(deviceData.filter((device) => {
      return isMobile(device)
    }).length)
  }
  useEffect(() => {

    calcKPI()

  }, [deviceData])

  const refresh = async () => {

    if (status.loading) {
      console.log("Already working")
      return
    }
    status.loading = true
    var more: boolean = true
    var nextUrl: string = ""
    var token: string = ""
    const newSet: GenericItem[] = []
    let countOfItemsRead = 0
    const snapshotToken = ""
    while (more) {
      const response = await snapshotDevices(snapshotToken, token, nextUrl)
      if (response.hasError) {
        seterrormessage(response.errorMessage ?? "Unknown error")
        more = false
        return
      }
      countOfItemsRead += response.countOfItemsRead
      setnumberOfItemsRead(countOfItemsRead)

      if (response.nextLink) {
        nextUrl = response.nextLink
        token = response.accessToken ?? ""
      } else {
        more = false
        setisloaded(true)
        status.loading = false
      }
    }
  }
  const load = async (applyFilter:(device:Device)=>boolean) => {
    if (deviceData.length === 0) return



    const users =
      deviceData.filter(device=>applyFilter(device)).map((user) => {
        const g: GenericItem = {
          id: user.id,
          title: (user.displayName ?? "not named") + " (" + user.operatingSystem + " " + user.operatingSystemVersion + ").",
          details: user.model ?? "unknown model",
          link: `https://portal.azure.com/#view/Microsoft_AAD_Devices/DeviceDetailsMenuBlade/~/Properties/objectId/${user.id}/deviceId`,
          string1: "Unknown",
          string2: null,
          string3: null,
        }
        return g
      }) ?? []

    setViewData(users.sort((a, b) => a.title.localeCompare(b.title)))
    setisloaded(true)
  }
  useEffect(() => {
    const load = async () => {
      debugger
      const snapshotToken = ""
      const devices = await readDevices(snapshotToken)

      setdeviceData(devices)
    }
    load()

  }, [])

  useEffect(() => {

    load((device)=>{return true})
  }, [deviceData])

  const col1: ColumnDef<GenericItem<any>> = {
    id: "string1",
    accessorKey: "string1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Sign in" />
    ),
    cell: ({ row }) => <div>{row.original.string1}</div>,
    enableSorting: true,
    enableHiding: true,
  }

  return (
    <div className="minh-screen w-full">
      <div className="container ">
        <div className="flex flex-wrap ">
          <h2 className={"my-3 text-2xl font-bold leading-none tracking-tight"} onClick={() => calcKPI()}>
            Devices  {!isloaded && <span> - loading ...</span>}
          </h2>
        </div>
        <div className="flex">
          <div className="w-[200px] space-y-4 ">
<div>
          <Button
                      variant={view==="kpi"?"default":"secondary"}
                      onClick={async () => {
setview("kpi")

                      }}
                    >
                      KPI&apos;s
                    </Button></div>
                    <div>
                    <Button
                      variant={view==="devices" ? "default":"secondary"}
                      onClick={async () => {
                        setview("devices")

                      }}
                    >
                      Device data
                    </Button></div>

          </div>
          <div className="grow">
        <div className="">
          {errormessage && <div className="text-red-600">{errormessage}</div>}
         
          {view==="kpi" && <div>

          <KPI name="w5" comments="Source: Intune Defender - Status: Implementing" numerator="#workstations with antivirus monitored" denominator="#total workstations" numeratorValue={workstationsWithAntivirus} denominatorValue={totalWorkstations} />
          <KPI name="w6" comments="Source: Forcepoint - Status: Analyzing" numerator="#workstations with DLP monitored" denominator="#total workstations" numeratorValue={workstationsWithDLPmonitored} denominatorValue={totalWorkstations} />
          <KPI name="w4" comments="Source: Intune Defender- Status: Implementing" numerator="#workstations with anti-malware agent monitored" denominator="#total workstations" numeratorValue={workstationsWithAntiMalware} denominatorValue={totalWorkstations} />
          <KPI name="w3" comments="Source: Intune Bitlocker - Status: Implementing" numerator="INTUNE Bitlocker#workstations protected by encryption tool" denominator="#total workstations" numeratorValue={workstationsprotectedbyencryptiontool} denominatorValue={totalWorkstations} />
          <KPI name="w2" comments="Source: Intune - Registrated Status: Implementing" numerator="#mobiles with active MDM segregation" denominator="#total mobiles" numeratorValue={mobilesWithActiveMDMsegregation} denominatorValue={totalMobiles} />
          <KPI name="w8" comments="Source: Intune - Status: Implementing" numerator="#workstations with system software up to date at month -1" denominator="#total workstations" numeratorValue={workstationswithsystemssoftwareuptodateaatmonthminus11} denominatorValue={totalWorkstations} />
          <KPI name="w7a" comments="Source: Intune - Status: Analysing" numerator="# users with USB enabled (with encryption)" numeratorValue={userswithusbWithEncryptionenabled} denominator={""} denominatorValue={0} />
          <KPI name="w7b" comments="Source: Local policy - Status: Analysing" numerator="# users with USB enabled (without encryption)" numeratorValue={userswithusbWithoutEncryptionenabled} denominator={""} denominatorValue={0} />
          <KPI name="cs11" comments="Source: Exchange - Status: Implementing" numerator="#SPAM Mail of previous month" numeratorValue={SPAMMailofpreviousmonth} denominator={""} denominatorValue={0} />
</div>}
{view==="devices" && <div>
        

          {true && <GenericTable data={viewData} addtionalColumns={[]}

            actions={{
              generalActionsComponent: () => {
                if (!isloaded) return <div></div>
                return (
                  <div className="space-x-4">
                    <Button
                      variant={filter==""?"default":"secondary"}
                      onClick={async () => {
                        setfilter("")
                        load((device)=>{return true})
                      }}
                    >
                      All
                    </Button>
                    <Button
                      variant={filter=="mobile"?"default":"secondary"}
                      onClick={async () => {
setfilter("mobile")
load((device)=>{return isMobile(device)})
                      }}
                    >
                      Mobile
                    </Button>
                    <Button
                      variant={filter=="windows"?"default":"secondary"}
                      onClick={async () => {
setfilter("windows")
load((device)=>{return isWindows(device)})
                      }}
                    >
                      Windows
                    </Button>
                    <Button
                      variant={filter=="mac"?"default":"secondary"}
                      onClick={async () => {
setfilter("mac")
load((device)=>{return isMac(device)})
                      }}
                    >
                      Mac
                    </Button>
                  </div>

                )
              },
            }}


          />}

</div>}
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}
