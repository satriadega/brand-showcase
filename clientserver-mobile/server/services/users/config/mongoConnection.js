const { MongoClient, ServerApiVersion } = require("mongodb");

// const uri = "mongodb://localhost:27017";
const uri = process.env.MONGO_DB_URL;
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
