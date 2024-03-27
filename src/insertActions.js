const { connectDb, closeConnectDb, mydbPromise,client } = require("./connectionDb");

// function add multi actions.

const addMultiActions = async () => {
  try {
    const db = await mydbPromise; // Wait for the connectDb promise to resolve
    console.log("Connected successfully to MongoDB");

    await db.collection("actions").insertMany([
      {
        title: "MoonLight",
        rate: 5,
        actors: [{ name: "Rami20", age: 27 }, { name: "Osama1", age: 35 }]
      },
      {
        title: "MoonLight EPS2",
        rate: 6,
        actors: [{ name: "Rami1", age: 23 }, { name: "Ola1", age: 45 }]
      },
      {
        title: "MoonLight EPS3",
        rate: 5,
        actors: [{ name: "Osama1", age: 38 }, { name: "Jomana1", age: 21 }]
      }
    ]).then(insertedDocuments => {
      console.log("Inserted documents successfully");
      console.log(insertedDocuments.insertedCount+" documents successfully");
      return closeConnectDb(client);
    }
    ).then(() => {
      console.log("Connection closed");
    }).catch(error => {
      console.error("Error in main function:", error);
    });
    
  } catch (error) {
    console.error("Error performing database operation:", error);
  }
}

// Call  multiple insert documents
addMultiActions()

//----------------------------------------------------------------


// insert one document

const addOneActions = async () => {
  try {
    const db = await mydbPromise; // Wait for the connectDb promise to resolve
    console.log("Connected successfully to MongoDB");

    await db.collection("actions").insertOne(
      {
        title: "MoonLight",
        rate: 10,
        actors: [{ name: "Rami233", age: 19 }, { name: "Osama233", age: 18 }]
      }).then(insertedDocument => {
        console.log("Inserted one document successfully");
        console.log(insertedDocument);
        return closeConnectDb(client);
      }).then(() => {
        console.log("Connection closed");
      }).catch(error => {
        console.error("Error in main function:", error);
      });
      
    // return result; 
  } catch (error) {
    console.error("Error performing database operation:", error);
  }
}

// call function
addOneActions()
