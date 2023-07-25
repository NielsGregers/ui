import { connect} from "@/lib/mongodb"

export default async function Session({ params }: { params: { sessionid: string } }) {
  const filter = {
    'sessionId': params.sessionid
  };
  
  const client = await connect()
  const coll = client.db('karlo').collection('user');
  const cursor = coll.find(filter);
  const user = await cursor.toArray();
  await client.close();

  return (
    <div className="container">
      <h1>Session</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      </div>
  );
}