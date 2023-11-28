import * as yaml from "js-yaml"

import travelplan from "./cava.waypoints.json"
import { Root as Journey } from "../../../../navcomponents/journey-schema"

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

function roleTypeFromTag(tag: string): RoleType {
  const s = tag.split(" ")
  //const s2 = s[0].split("-")
  const name = s[0]
  let attributes = s.length > 1 ? s[1].split(" ") : []

  return { name, attributes, relations: [] }
}
function roleTypes(journey: Journey): RoleType[] {
  const map = new Map<string, RoleType>()
  journey.waypoints.map((waypoint) => {
    waypoint.loads.containers.map((container) => {
      container.who.map((name) => {
        const role = roleTypeFromTag(name)
        const roleKey = role.name
        if (map.has(roleKey)) {
          const existingRole = map.get(roleKey)
          if (existingRole) {
            if (!existingRole.relations.includes(container.name)) {
              existingRole.relations.push(container.name)
            }
          }
        } else {
          map.set(roleKey, { name: roleKey, relations: [container.name] })
        }
      })
    })
  })
  return Array.from(map.values())
}
/**
 * 
 * @param tag resources-requirements:0
 * @returns 
 */
function cargoTypeFromTag(tag: string): CargoType {
  const s = tag.split(":")
  const s2 = s[0].split("-")
  const n = s2[0]
  let stage = s2[1] ?? ""
  const stageSplit =  stage.split(" ").filter(s => s.length > 0)
  const cargoType : CargoType = { name:n.trim(), stages: [], isList: n.trim().endsWith("s") ,attributes:[]}

  if (stageSplit.length > 0) {
    cargoType.stages.push(stageSplit[0])
  }else{
    cargoType.stages.push("")
  }
if (stageSplit.length > 1){
    cargoType.attributes = stageSplit.slice(1)
}

  return cargoType
}
function cargoTypes(journey: Journey): CargoType[] {
  const map = new Map<string, CargoType>()

  const process = (artifact: string) => {
    const cargoType = cargoTypeFromTag(artifact)
    if (map.has(cargoType.name)) {
      const existingCargoType = map.get(cargoType.name)
      if (existingCargoType) {
        const newStages = cargoType.stages.filter(
          (stage) => (!existingCargoType.stages.includes(stage)) && stage !== ""
        )
        existingCargoType.stages.push(...newStages)
      }
    } else {
      map.set(cargoType.name, cargoType)
    }
  }
  journey.waypoints.map((waypoint) => {
    waypoint.loads.containers.map((container) => {
      container.needs.map((artifact) => {
        process(artifact)
      })
      container.produces.map((artifact) => {
        process(artifact)
      })
    })
  })
  return Array.from(map.values())
}

export class CargoHold {
  private _bag: Map<string, string>
  private _cargoTypes: CargoType[]
  private _roleTypes: RoleType[]
  constructor(plan: Journey) {
    this._bag = new Map<string, string>()
    
    this._cargoTypes = cargoTypes(plan)
    this._roleTypes = roleTypes(plan)
  }
  public set travelplan(plan: Journey) {
    this._cargoTypes = cargoTypes(plan)
    this._roleTypes = roleTypes(plan)
  }

  public close() {}
  public get(key: string): string | undefined {
    return this._bag.get(key)
  }

  public set(key: string, value: string): void {
    this._bag.set(key, value)
  }

  public get cargoTypes(): CargoType[] {
    return this._cargoTypes
  }
  public get cargoYaml(): string {
    return yaml.dump(this._cargoTypes)
  }

  public get roleTypes(): RoleType[] {
    return this._roleTypes
  }
  public get roleYaml(): string {
    return yaml.dump(this._roleTypes)
  }
}
