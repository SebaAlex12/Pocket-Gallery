import express = require("express");
import mongoose = require("mongoose");
import multer = require("multer");

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

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // console.group('disk storage');
    // console.log(req.body.dest);
    // console.groupEnd();
    // console.log(req.body);
    console.log("multer", req.body);
    cb(null, "uploads");

    // cb(null, req.body.file);
    // console.log("diskstorage", req.body.file);
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});

// app.use(multer({ storage: storage }).single("file"));

// const upload = multer({ storage: storage });

const upload = multer({ dest: "uploads/" });

app.put("/upload", upload.single("file"), (req, res, next) => {
  // console.log("express use", req.body.file);
});

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
