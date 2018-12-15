const mongoose = require("mongoose");

const Client = require("../../models/client");
const { DB_CONNECTIONS, DB_DRIVER } = require("../../../config");

const mongoDb = DB_CONNECTIONS.find(d => d.driver === DB_DRIVER);
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.url);
database = mongoose.connection;

database.on("error", () => {
  console.error.bind(console, "MongoDB error:");
  database.close();
});
database.once("open", () => {
  console.log("Connected to MongoDB");

  // Update initial data set.
  const client = new Client({
    _id: 1,
    clientType: "Web"
  });
  client.save((error, resp) => {
    if (error) {
      console.error("500 Internal Server Error", error);
      return;
    }
    console.log("Initial data updated.", resp);
  });

  setTimeout(() => {
    database.close();
  }, 1000);
});
