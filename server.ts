import express = require("express");
import mongoose = require("mongoose");

import graphqlHttp = require("express-graphql");
import graphqlSchema = require("./graphql/schema");
import graphqlResolver = require("./graphql/resolvers");

const app: express.Application = express();

// DB config

const db = require("./config/keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
