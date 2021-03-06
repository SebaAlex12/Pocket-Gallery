import mongoose = require("mongoose");
import express = require("express");
import bodyParser = require("body-parser");
import path = require("path");

import graphqlHttp = require("express-graphql");
import graphqlSchema = require("./graphql/schema_old");
import graphqlResolver = require("./graphql/resolvers");

import { upload, resize } from "./utils/filesManager";

const app: express.Application = express();

import fs = require("fs");

const bodyParserJson = bodyParser.json({ limit: "50mb" });
const bodyParserUrlencoded = bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
});

// DB config

const db = require("./config/keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Handle the upload image
app.post("/upload-image/:dest", async (req: any, res) => {
  await upload(req, res, err => {
    if (err) {
      console.log("error message:", err);
      res.json(err);
    } else {
      if (req.files == undefined) {
        console.log("No file selected!");
        res.json("No file selected!");
      } else {
        // console.log("req files", req.files);
        req.files.forEach(file => {
          const readStream = resize(file.path, "jpg", 300, 300);
          readStream.toFile(
            file.destination + "/mini/" + file.filename,
            function(err) {
              console.log(err);
            }
          );
        });
        console.log("Files uploaded successfully!");
        res.json("Files uploaded successfully!!");
      }
    }
  });
});

app.post("/delete-image/", bodyParserJson, (req: any, res) => {
  console.log(req.body.links);
  const links = req.body.links;
  links.forEach(async link => {
    // build link for mini folder
    const arr = link.split("/");
    const miniLink = [arr[1], arr[2], arr[3], "mini", arr[4]].join("/");
    console.log("miniLink", miniLink);
    try {
      await fs.unlink("./client/public/" + link, function(err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      await fs.unlink("./client/public/" + miniLink, function(err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      res.json("Selected images has been deleted");
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  });
});

// app.use(function(err, req, res, next) {
//   if (err instanceof multer.MulterError) res.status(500).send(err.message);
//   else next(err);
// });

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

// serv assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
