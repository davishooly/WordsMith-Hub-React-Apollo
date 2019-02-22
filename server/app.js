const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

mongoose.connect(
  "mongodb://Kimame:kimame@cluster0-shard-00-00-edl6t.mongodb.net:27017,cluster0-shard-00-01-edl6t.mongodb.net:27017,cluster0-shard-00-02-edl6t.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
);
mongoose.connection
  .once("open", () => {
    console.log("connected to database");
  })
  .catch(error => {
    console.log(error);
  });
// create an express server here
const app = express();
// construct an express application based on graphql schema
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
app.listen(4000, () => {
  console.log(`App ready on port: 4000`);
});
