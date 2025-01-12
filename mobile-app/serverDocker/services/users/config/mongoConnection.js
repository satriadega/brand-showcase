const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  process.env.NODE_ENV === "production"
    ? "mongodb://172.17.0.1:6664"
    : "mongodb://localhost:6664";
let db;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    db = await client.db("P3-C2");
    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.log(err);
    await client.close();
  }
}

const getDB = () => db;

module.exports = { connect, getDB };
