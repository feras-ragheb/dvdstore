const { MongoClient,ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function connectDb(client) {
  try {
    await client.connect();
    return client.db("dvdstore_db");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error to be caught outside
  }
}

async function closeConnectDb(client) {
  await client.close();
}

const mydbPromise = connectDb(client); // Store the promise returned by connectDb


module.exports = {
    connectDb,
    closeConnectDb,
    mydbPromise,
    client,
    ObjectId
  };
  