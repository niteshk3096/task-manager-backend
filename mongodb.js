const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://localhost:27017";
const databaseName = "task-manager";

const client = new mongoClient(connectionUrl);
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(databaseName);
  const collection = db.collection("users");
  // const insertData = await collection.insertOne({ name: "defgh", age: 27 });
  // console.log("data inserted", insertData);

  // the following code examples can be pasted here...
  try {
    // await collection.insertMany([
    //   { task: "Call client", completed: false },
    //   { task: "Stup RN", completed: true },
    //   { task: "Create sprint plan", completed: false },
    // ]);
    const cusrsor = await collection
      .find({
        $and: [{ age: { $gte: 21 } }, { age: { $lt: 27 } }],
      })
      .toArray();
    console.log("data", cusrsor.length);
  } catch (error) {
    console.log("error", error);
    if (error instanceof MongoServerError) {
      console.log(`Error worth logging: ${error}`); // special case for some reason
    }
    throw error;
  }

  return "done.";
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
