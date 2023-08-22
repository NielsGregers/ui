import { Id, CreatedAt, UpdatedAt, Createddatetime, Lastmodifieddatetime, Createdby, Lastmodifiedby, Parentreference, Contenttype } from "./shared"
export namespace Units {

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
  unitdata: Unitdata
}
 
  
  export interface Unitdata {
    title: string
    sortorder: number
    unittype: string
  }
}
  