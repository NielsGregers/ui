
import {connect} from "."


  it("give me a Mongo connection", async () => {
    
    var connection = await connect()
    
    var collections = await connection.db("magicbox").collections()
    expect(connection).not.toBeNull()
    

  });
