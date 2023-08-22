import { Id, CreatedAt, UpdatedAt, Createddatetime, Lastmodifieddatetime, Createdby, Lastmodifiedby, Parentreference, Contenttype } from "./shared"
export namespace NewsChannels {
export interface Root {
    _id: Id
    created_at: CreatedAt
    updated_at: UpdatedAt
    odataetag: string
    createddatetime: Createddatetime
    etag: string
    id: string
    lastmodifieddatetime: Lastmodifieddatetime
    weburl: string
    createdby: Createdby
    lastmodifiedby: Lastmodifiedby
    parentreference: Parentreference
    contenttype: Contenttype
    fieldsodatacontext: string
    newschannel: Newschannel
  }
  
 
  
  export interface Newschannel {
    title: string
    relevantunits: Relevantunit[]
    mandatory: boolean
    relevantcountires: Relevantcountire[]
    region: Region[]
    newscategory: Newscategory[]
    tag: string
  }
  
  export interface Relevantunit {
    lookupid: number
    lookupvalue: string
  }
  
  export interface Relevantcountire {
    lookupid: number
    lookupvalue: string
  }
  
  export interface Region {
    lookupid: number
    lookupvalue: string
  }
  
  export interface Newscategory {
    lookupid: number
    lookupvalue: string
  }
}
  