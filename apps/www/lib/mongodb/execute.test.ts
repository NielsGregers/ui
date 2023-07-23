import * as mongoDB from "mongodb";
import {execute} from "."


  it("give me a Mongo connection", async () => {
    var result = await execute((client:mongoDB.MongoClient)=>{
      return new Promise((resolve, reject) => {
        var dbName = client.db("test").databaseName
        resolve(dbName);
      });
    })
  
    
    expect(result).not.toBeNull()
    expect(result).toBe("test")
    
  });
