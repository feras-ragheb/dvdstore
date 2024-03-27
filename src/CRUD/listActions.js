const {
  connectDb,
  closeConnectDb,
  mydbPromise,
  client,
  ObjectId,
} = require("../connectionDb");

const findAction = async (query) => {
  try {
    const db = await mydbPromise; // Wait for the connectDb promise to resolve

    const result = await db.collection("actions").findOne(query);
    return result;
  } catch (error) {
    console.error("Error performing database operation:", error);
  }
};

const query = { _id: new ObjectId("6604160bee53384cb0da2ae3") };
//const query = { "actors.age": 32 }
// findAction(query)
//   .then((data) => {
//     const formattedData =[{
//         _id: data._id,
//         title: data.title,
//         rate: data.rate,
//         actors: data.actors.map(actor =>  `${actor.name},${actor.age}` ).join(','),
//       }];
//     console.table(formattedData);
//   })
//   .then(() => {
//     return closeConnectDb(client);
//   })
//   .catch((error) => {
//     error.status = 404;
//     if (error.status) {
//         console.error(`Error ${error.status}: ${error.message}`);
//       } else {
//         console.error("Error in main function:", error.message);
//       }
//   });

//----------------------------------------------------------------
const findAllActions = async (query = {}, sortById) => {
  try {
    const db = await mydbPromise;
    const results = await db
      .collection("actions")
      .find(query)
      .limit(4)
      .sort(sortById)
      .toArray();
    return results;
  } catch (error) {
    console.error("Error performing database operation:", error);
  }
};




const filter_by = {
  "actors.age": { $gte: 20 },
  rate: { $gte:  1 },
//  title: { $regex: /M/i },
};
const sort_by_id = { rate: -1 };

//call function
findAllActions(filter_by, sort_by_id)
  .then((data) => {
    console.log("All Data List:");
    // console.log(data);

    const values = [];

    data.forEach((item) => {
      //const joinedNames =  `${item.actors[0]?.name ?? 'N/A'}, ${item.actors[1]?.name ?? 'N/A'}`;
      const joinedNames = item.actors
        .map((act) => `Name:${act?.name ?? "N/A"},Age: ${act?.age ?? "N/A"}`)
        .join(", ");
      // console.log(item.actors)
      values.push({
        Title: item.title,
        Rate: item.rate,
        Actors: joinedNames,
      });
    });
    console.table(values);
  })
  .then(() => {
    return closeConnectDb(client);
  })
  .catch((error) => {
    console.error("Error in main function:", error);
  });

  //  ----------------------------------------------------------------
  const findAllActionsCount = async (query = {}, sortById) => {
    try {
      const db = await mydbPromise;
      await db
        .collection("actions")
        .find(query)
        .toArray()
        .then((result) => {
           // console.log(result);
            // return db.collection("actions").estimatedDocumentCount();
            return result.length;
        })
        .then((count) => {
            console.log("Total documents:", count);
          })
     //return results;
    } catch (error) {
      console.error("Error performing database operation:", error);
    }
  };

  //.then((results) => { console.log(results) });
//   setTimeout( () => {
//        console.log("loading results")
// }, 2000);

// findAllActionsCount(filter_by);