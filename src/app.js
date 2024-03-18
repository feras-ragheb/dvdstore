const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";

async function connectDb() {

 const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("dvdstore_db")
    const result = await db.collection("actions").insertOne(
         { 
            title:"NYC",
            rate : 8,
            actors:[{name:"John",age:23},{name:"Jake",age:45},{name:"Maria",age:27}]
         }
        )
    console.log("Inserted document with _id:",result.insertedId)
    console.log("Connected successfully to server");
  } catch(error){
    console.error("Error connecting to MongoDB:", error);
  }
  finally {
    await client.close();
  }
}

connectDb()
