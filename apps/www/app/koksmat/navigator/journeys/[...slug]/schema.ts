export interface Root {
  journey: string
  metadata: Metadata
  waypoints: Waypoint[]
  shipyards: Shipyards
  kitchens: Kitchens
}

export interface Metadata {
  app: string
  name: string
  description: string
}

export interface Waypoint {
  port: string
  loads: Loads
}

export interface Loads {
  containers: Container[]
}

export interface Container {
  container: any
  name: string
  who: string[]
  needs: string[]
  produces: string[]
  script: string
  "container:": any
}

export interface Shipyards {
  description: string
  facility: Facility
  human: string
}

export interface Facility {
  "-description": string
}

export interface Kitchens {
  description: string
  stations: Stations
}

export interface Stations {
  templates: Templates
  pantry: Pantry
}

export interface Templates {
  values: Value[]
}

export interface Value {
  creator?: Creator[]
  created?: string
  title?: string
  description?: string
  modified?: string
  modifiedbu?: Modifiedbu[]
  id?: string
  version?: string
}

export interface Creator {
  name?: string
  email?: string
  phone?: string
}

export interface Modifiedbu {
  name?: string
  email?: string
  phone?: string
}

export interface Pantry {
  tickets: Tickets
}

export interface Tickets {
  "prepare-meeting": PrepareMeeting[]
  "pre-invitation": PreInvitation[]
  "approve-agenda": ApproveAgenda[]
  "prepare-invitation": PrepareInvitation[]
  "resource-booking": ResourceBooking[]
  "send-invitation": SendInvitation[]
}

export interface PrepareMeeting {
  creator?: Creator2[]
  created?: string
  title?: string
  description?: string
  modified?: string
  modifiedbu?: Modifiedbu2[]
  id?: string
  version?: string
}

export interface Creator2 {
  name?: string
  email?: string
  phone?: string
}

export interface Modifiedbu2 {
  name?: string
  email?: string
  phone?: string
}

export interface PreInvitation {
  creator?: Creator3[]
  created?: string
  title?: string
  description?: string
  modified?: string
  modifiedbu?: Modifiedbu3[]
  id?: string
  version?: string
}

export interface Creator3 {
  name?: string
  email?: string
  phone?: string
}

export interface Modifiedbu3 {
  name?: string
  email?: string
  phone?: string
}

export interface ApproveAgenda {
  creator?: Creator4[]
  created?: string
  title?: string
  description?: string
  modified?: string
  modifiedbu?: Modifiedbu4[]
  id?: string
  version?: string
}

export interface Creator4 {
  name?: string
  email?: string
  phone?: string
}

export interface Modifiedbu4 {
  name?: string
  email?: string
  phone?: string
}

export interface PrepareInvitation {
  creator?: Creator5[]
  created?: string
  title?: string
  description?: string
  modified?: string
  modifiedbu?: Modifiedbu5[]
  id?: string
  version?: string
}

export interface Creator5 {
  name?: string
  email?: string
  phone?: string
}

export interface Modifiedbu5 {
  name?: string
  email?: string
  phone?: string
}

export interface ResourceBooking {
  creator?: Creator6[]
  created?: string
  title?: string
  description?: string
  modified?: string
  modifiedbu?: Modifiedbu6[]
  id?: string
  version?: string
}

export interface Creator6 {
  name?: string
  email?: string
  phone?: string
}

export interface Modifiedbu6 {
  name?: string
  email?: string
  phone?: string
}

export interface SendInvitation {
  creator?: Creator7[]
  created?: string
  title?: string
  description?: string
  modified?: string
  modifiedbu?: Modifiedbu7[]
  id?: string
  version?: string
}

export interface Creator7 {
  name?: string
  email?: string
  phone?: string
}

export interface Modifiedbu7 {
  name?: string
  email?: string
  phone?: string
}
