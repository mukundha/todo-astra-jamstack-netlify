const { createClient } = require("@astrajs/collections");
const { Client } = require("cassandra-driver");

let astraClient = null;
let client = null ;
const getAstraClient = async () => {
  if (astraClient === null) {
    astraClient = await createClient(
      {
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
      },
      30000
    );
  }
  return astraClient;
};

const getCollection = async () => {
  const documentClient = await getAstraClient();
  return documentClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection("sag_todos");
};


const getNativeClient = async () => {
  if (client == null) {
    if (process.env.DB_CHOICE == 'SCYLLA')
    {
      client = new Client({      
        contactPoints:[process.env.SCYLLA_IP],
        localDataCenter: process.env.SCYLLA_DC,
        credentials: {
          username: process.env.SCYLLA_USERNAME,
          password: process.env.SCYLLA_PASSWORD,
        },
        keyspace: process.env.SCYLLA_KEYSPACE
      })
    } 
    else if ( process.env.DB_CHOICE == 'ASTRA')
    {
      client = new Client({
        cloud: {
          secureConnectBundle: process.env.ASTRA_SECURE_BUNDLE,        
        },
        credentials: {
          username: process.env.ASTRA_USERNAME,
          password: process.env.ASTRA_PASSWORD,
        },
        keyspace: process.env.ASTRA_DB_KEYSPACE
      });
    }
    await client.connect();
  } 
  return client;  
}


module.exports = { getAstraClient, getCollection, getNativeClient };
