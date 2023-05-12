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
    client = new Client({
      cloud: {
      secureConnectBundle: "/Users/mukundha/Downloads/secure-connect-demo2.zip",
      },
      credentials: {
      username: "mLaLiYZeQYyUPfesRvpUEBBd",
      password: "3jT5lU2Ooq..MjWSisujW0QFE4q69To7bZf467YrgrcCiY2WwxymAnOt8m6xBNoTwyDiPLH0x,WzntNrLTsetY_Qfo0tlX+Thfx,vF6vimzgz4fbAKARoFuHJmCoOv.n",
      },
    })
    await client.connect();
  } 
  return client;  
}


module.exports = { getAstraClient, getCollection, getNativeClient };
