const {
    connectDb,
    closeConnectDb,
    mydbPromise,
    client,
    ObjectId,
  } = require("../connectionDb");


  const updateAction = async (id,query) => {
    try {
      const db = await mydbPromise; // Wait for the connectDb promise to resolve
      await db.collection("actions").updateOne(id,query).then((result) => {
         console.log("Updated Records:",result.modifiedCount);
         console.log("Matched Records:",result.matchedCount);
         console.log("Record Updated:",result)
         return closeConnectDb(client);
        }).catch((error) => { console.log(error)});

    } catch (error) {
      console.error("Error performing database operation:", error);
    }
  };

const id = { _id: new ObjectId("6604261270854849c214c98d") }

const querySet = {
    $set: { title: "MoonLight2024", "actors.0.name" : "Rami Majad","actors.0.age" : 42 , "actors.1.name" : "Osama Mahmoud"},
    $inc: { rate: 9.5 }
 }


 //updateAction(id,querySet)

 //----------------------------------------------------------------

const updateAllAction = async (condition,querySet) =>{

    try{
        const db = await mydbPromise;
        await db.collection("actions").updateMany(condition,querySet).then((result) => {
            console.log("Updated Records:",result.modifiedCount);
            console.log("Matched Records:",result.matchedCount);
            // console.log("Record Updated:",result)
            return closeConnectDb(client);
           }).catch((error) => { console.log(error)});

    }catch(error){
        console.error("Error performing database operation:", error);
    }
}

const conditionParam = { "actors.age": { $gte: 100 }  }
const querySetParam = {
    $inc: {"actors.0.age": -30,"actors.1.age": -30}
}
//updateAllAction(conditionParam,querySetParam)

//----------------------------------------------------------------

const deleteAction = async (condition) =>{

    try{
        const db = await mydbPromise;
        await db.collection("actions").deleteOne(condition).then((result) => {
            console.log("Count Delete Records:",result.deletedCount);
            console.log("Record Deleted:",result)
            return closeConnectDb(client);
           }).catch((error) => { console.log(error)});

    }catch(error){
        console.error("Error performing database operation:", error);
    }
}

const delConditionParam = { "actors.age": { $gte: 95 }  }

//deleteAction(delConditionParam)

//----------------------------------------------------------------

const deleteAllAction = async (condition) =>{

    try{
        const db = await mydbPromise;
        await db.collection("actions").deleteMany(condition).then((result) => {
            console.log("Count Delete Records:",result.deletedCount);
            console.log("Record Deleted:",result)
            return closeConnectDb(client);
           }).catch((error) => { console.log(error)});

    }catch(error){
        console.error("Error performing database operation:", error);
    }
}

const delParam = { "actors.age": { $gte: 40 }  }

deleteAllAction(delParam)