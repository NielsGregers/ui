export interface Id {
    $oid: string
  }
  
  export interface CreatedAt {
    $date: string
  }
  
  export interface UpdatedAt {
    $date: string
  }
  
  export interface Createddatetime {
    $date: string
  }
  
  export interface Lastmodifieddatetime {
    $date: string
  }
  
  export interface Createdby {
    user: User
  }
  
  export interface User {
    email: string
    id: string
    displayname: string
  }
  
  export interface Lastmodifiedby {
    user: User2
  }
  
  export interface User2 {
    email: string
    id: string
    displayname: string
  }
  
  export interface Parentreference {
    id: string
    siteid: string
  }
  
  export interface Contenttype {
    id: string
    name: string
  }