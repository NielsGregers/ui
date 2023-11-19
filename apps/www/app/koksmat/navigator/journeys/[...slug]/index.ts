
import { fr } from "date-fns/locale"
import travelplan from "./cava.json"
import {Root as Journey} from "./schema"
import { Strings } from "@/app/magicbox/data/sharepoint-extention"

export default travelplan as Journey


export interface CargoType {
    name: string
    description?: string
    stages: string[]
    isList: boolean
    attributes?: string[]
}

export interface RoleType {
    name: string
    relations: string[]
    attributes?: string[]
}

function roleTypeFromTag(tag : string) : RoleType {
    debugger
    const s = tag.split(" ")
    //const s2 = s[0].split("-")
    const name = s[0]
    let attributes = s.length > 1 ? s[1].split(" ")  : []
   

    return {name,attributes,relations:[]}
}
function roleTypes(journey : Journey) : RoleType[] {
    const map = new Map<string,RoleType>()
    journey.waypoints.map(waypoint => {
        waypoint.loads.containers.map(container => {


            container.who.map(name => {
               const role = roleTypeFromTag(name)
               const roleKey = role.name
               if (map.has(roleKey)) {
                   const existingRole = map.get(roleKey)
                   if (existingRole) {
                    
                        if (!existingRole.relations.includes(container.name)) {
                            existingRole.relations.push(container.name)
                        }   
                        
                   }
                }else{
                    map.set(roleKey,{name:roleKey,relations:[container.name]})
                }
            })
           

        })
    }   )
    return Array.from(map.values())



}

function cargoTypeFromTag(tag : string) : CargoType {
    const s = tag.split(":")
    const s2 = s[0].split("-")
    const name = s2[0]
    let stage = s2[1] ?? ""
   

    return {name,stages:[stage],isList:name.endsWith("s")}
}
function cargoTypes(journey : Journey) : CargoType[] {
    const map = new Map<string,CargoType>()
    
    journey.waypoints.map(waypoint => {
        waypoint.loads.containers.map(container => {


            container.needs.map(artifact => {
               const cargo = cargoTypeFromTag(artifact)
               if (map.has(cargo.name)) {
                   const existingCargoType = map.get(cargo.name)
                   if (existingCargoType) {
                    
                       const newStages = cargo.stages.filter(stage => (!existingCargoType.stages.includes(stage)))
                       existingCargoType.stages.push(...newStages)
                   }
                }else{
                    map.set(cargo.name,cargo)
                }
            })
            container.produces.map(artifact => {
                const cargo = cargoTypeFromTag(artifact)
               if (map.has(cargo.name)) {
                   const c = map.get(cargo.name)
                   if (c) {
                       c.stages.push(...cargo.stages)
                   }
                }else{
                    map.set(cargo.name,cargo)
                }
            })

        })
    }   )
    return Array.from(map.values())



}

export class CargoHold {
    private _bag : Map<string,string>
    private _cargoTypes : CargoType[]
    private _roleTypes : RoleType[]
  constructor(travelplan : Journey
  ) {
    this._bag = new Map<string,string>()
    this._cargoTypes =   cargoTypes(travelplan)
    this._roleTypes = roleTypes(travelplan)
  }

    public close(){

    }
    public get(key:string):string | undefined {
        return this._bag.get(key)
    }

    public set(key:string,value:string):void {
        this._bag.set(key,value)
    }

    public get cargoTypes() : CargoType[] {
        return this._cargoTypes
    }

    public get roleTypes() : RoleType[] {
        return this._roleTypes
    }   
}