"use server"
import { connect } from "@/lib/mongodb";
import { WithId } from "mongodb";

interface LicencePlates extends WithId<Document>{
    licenceplates:string[]
}

export async function getUserPlates(email:string){
    const filter = {
        'upn': email
      };
      const projection = {
        '_id': 0, 
        'upn': 0
      };
      const client = await connect()
      const coll = client.db('booking').collection('users');
      const cursor = coll.find(filter, { projection });
      const data = await cursor.toArray() as LicencePlates[];
      const result = data[0]?.licenceplates??[];
      await client.close();
      return result
}