export interface Root {
  journey: string
  metadata: Metadata
  waypoints: Waypoint[]
}

export interface Metadata {
  app: string
  name: string
  description: string
}

export interface Waypoint {
  port: string
  loads: Loads
  services?: Service[]
}

export interface Loads {
  containers: Container[]
}

export interface Container {
  container: any
  name: string
  key: string
  who: string[]
  needs: string[]
  produces: string[]
  script: string
}

export interface Service {
  tugs: Tug[]
}

export interface Tug {
  tug: any
  name: string
  who: string[]
  needs: string[]
  produces: string[]
  script: string
}
