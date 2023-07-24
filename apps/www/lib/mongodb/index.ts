// https://www.mongodb.com/community/forums/t/mongodb-equivalent-of-stored-procedures/130476




import * as mongoDB from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

export function connect(): Promise<mongoDB.MongoClient> {
  return new Promise(async (resolve, reject) => {
    var options: mongoDB.MongoClientOptions = {}


    var connectionString = (process.env.MONGODB as string) 

    var client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString, options)
    client.connect()
      .then((client) => {
        resolve(client);
      })

      .catch((e: any) => {
        console.log("Connect error", e)
        reject(e);
      });
  });
}
export function execute(databaseName : string,cb: any) {
  return new Promise(async (resolve, reject) => {
    var client = mongoDB.MongoClient as any;
    try {
      client  = await connect().catch((e) => reject(e));
      if (client) {
        const result = await cb(client, databaseName).catch((error: any) => {
          reject(error);
        });

        if (result) {
          resolve(result);
        } else {
          resolve({});
        }
      }
    } catch (error) {
      reject(error);
    } finally {
      if (client) client.close();
    }
  });
}

export function aggregate(databaseName : string,collectionName: any, pipeline: any): Promise<any> | Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    var docs = await execute(databaseName,(client: any) => {
      return new Promise(async (resolve, reject) => {
        try {
          var docs: any[] = [];
          var collection = client.db(databaseName).collection(collectionName);

          //logger("collection.aggregate",pipeline)
          await collection
            .aggregate(pipeline)
            .forEach((item: any) => {
              docs.push(item);
            })
            .catch((error: any) => {
              reject(error);
            })


          resolve(docs);
        } catch (error) {
          reject(error);
        }
      });
    }).catch((error) => {
      reject(error);
    });

    resolve(docs);
  });
}

export function findOne(databaseName:string,collectionName: any, field: any, value: any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    var doc: any = await execute(databaseName,(client: any) => {
      return new Promise(async (resolve, reject) => {
        var items = [];
        var query = { key: value };
        console.log(query);
        var item = await client
          .db(databaseName)
          .collection(collectionName)
          .findOne(query);

        resolve(item);
      });
    }).catch((e) => reject(e));

    resolve(doc.length > 0 ? doc[0] : null);
  });
}
export function find(databaseName :string,collectionName: any, pipeline: any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    var doc: any = await execute(databaseName,(client: any) => {
      return new Promise(async (resolve, reject) => {
        var items: any[] = [];
        await client
          .db(databaseName)
          .collection(collectionName)
          .aggregate(pipeline)
          .forEach((item: any) => {
            items.push(item);
          });

        resolve(items);
      });
    }).catch((e) => reject(e));

    resolve(doc.length > 0 ? doc[0] : null);
  });
}
export function insert(databaseName : string,collectionName: any, body: any): Promise<void> {
  return new Promise(async (resolve, reject) => {
  
    var doc = await execute(databaseName,(client: any) => {
      return client
        .db(databaseName)
        .collection(collectionName)
        .insertOne({
          body,

          date: new Date(Date.now()).toISOString(),
        });
    });
    resolve();
  });
}

export function update(databaseName :string,collectionName: any, nanoid: any, body: any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    var doc = await execute(databaseName,(client: any) => {
      body.updatedDate = new Date(Date.now()).toISOString();
      return client
        .db(databaseName)
        .collection(collectionName)
        .updateOne({ nanoid }, { $set: body });
    });
    resolve(doc);
  })
}

export function remove(databaseName :string,collectionName: any, nanoid: any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    var doc = await execute(databaseName,(client: any) => {
      //body.updatedDate = new Date(Date.now()).toISOString();
      return client
        .db(databaseName)
        .collection(collectionName)
        .deleteMany({ nanoid });
    });
    resolve(doc);
  });
}
export function log(databaseName : string,title: any, body: any): Promise<void> {
  return new Promise(async (resolve, reject) => {

    var doc = await execute(databaseName,(client: any) => {
      return client
        .db(databaseName)
        .collection("logs")
        .insertOne({
         
          title,
          body,

          date: new Date(Date.now()).toISOString(),
        });
    });
    resolve();
  });
}


export function logError(databaseName :string,title: any, body: any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    var doc = await execute(databaseName,(client: any) => {
      return client
        .db(databaseName)
        .collection("logs")
        .insertOne({
          isError: true,
          title,
          body,

          date: new Date(Date.now()).toISOString(),
        });
    });
    resolve(doc);
  });
}
export function upload(databaseName :string,  body: any, uploadCollectionName: any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      await execute(databaseName,(client: any) => {
        return client
          .db(databaseName)
          .collection(uploadCollectionName)
          .deleteMany({});
      });

      var data: any = await execute(databaseName,(client: any) => {
        return client
          .db(databaseName)
          .collection(uploadCollectionName)
          .insertMany(body);
      });
      /*
                        const insertNewPosts = [
                            {
                              '$unset': [
                                '_id'
                              ]
                            }, {
                              '$merge': {
                                'into': 'posts', 
                                'on': 'key', 
                                'whenMatched': 'merge', 
                                'whenNotMatched': 'insert'
                              }
                            }
                          ]
            
                        await execute((client) => {
                            return new Promise(async (resolve, reject) => {
                                try {
            
                                    var items = []
                                    await client.db(databaseName).collection(uploadCollectionName).aggregate(insertNewPosts).forEach(item => {
                                        items.push(item)
                                    })
            
                                    resolve(items)
                                } catch (error) {
                                    reject(error)
                                }
            
                            })
            
            
                        })
            
                        var hideExisting = [
                            {
                              '$lookup': {
                                'from': 'uploads', 
                                'localField': 'key', 
                                'foreignField': 'key', 
                                'as': 'upload'
                              }
                            }, {
                              '$match': {
                                'upload': {
                                  '$size': 0
                                }
                              }
                            }, {
                              '$unset': [
                                'upload'
                              ]
                            }
                          ]
            
                          await execute((client) => {
                            return new Promise(async (resolve, reject) => {
                                try {
            
                                    
                                    var items = []
                                    await client.db(databaseName).collection("posts").aggregate(hideExisting).forEach(item => {
                                        items.push(item)
                                    })
                                    
                                    resolve(items)
                                } catch (error) {
                                    reject(error)
                                }
            
                            })
            
            
                        })
            
            
            
                
                        execute((client) => {return client.db(databaseName).collection("logs").insertOne({
                            tenant:tenantName,
                            title:"Updated news",
                            body,
                            data,
                            date: new Date(Date.now()).toISOString()
                        })})
                    
                        return res.status(200).json({ ok: true });
                    } catch (error) {
                        
                        execute((client) => {return client.db(databaseName).collection("logs").insertOne({
                            tenant:tenantName,
                            title:"Updated news",
                            hasError:true,
                            error,
                            body,
                            date: new Date(Date.now()).toISOString()
                        })})
            
            
                        return res.status(500).json({ error });
                        */
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}


export interface DbAndCollection {
  db: string;
  collection: string;
}

export  function getDbAndCollection(
  databaseName: string,
  collectionName: string
): DbAndCollection {
  var result: DbAndCollection = { db: databaseName, collection: collectionName };
  var s = collectionName.split("@");
  if (s.length > 1) {
    result.db = s[1];
    result.collection = s[0];
  }
  return result;
}
