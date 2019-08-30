import express = require("express");
import mongoose = require("mongoose");
// import bodyParser = require("body-parser");
import multer = require("multer");

import graphqlHttp = require("express-graphql");
import graphqlSchema = require("./graphql/schema");
import graphqlResolver = require("./graphql/resolvers");

const app: express.Application = express();

// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: true,
//     parameterLimit: 50000
//   })
// );

// DB config

const db = require("./config/keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./client/public/photos/" + req.params.dest.replace("-", "/"));
  },
  filename: function(req, file, cb) {
    console.log("file arguments:", file);
    // null as first argument means no error
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000
  },
  fileFilter: function(req, file, cb) {
    sanitizeFile(file, cb);
  }
}).array("files");

function sanitizeFile(file, cb) {
  // Define the allowed extension
  let fileExts = ["png", "jpg", "jpeg", "gif"];
  // Check allowed extensions
  let isAllowedExt = fileExts.includes(
    file.originalname.split(".")[1].toLowerCase()
  );
  // Mime type must be an image
  let isAllowedMimeType = file.mimetype.startsWith("image/");
  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    cb("Error: File type not allowed!");
  }
}

// Handle the upload image
app.post("/upload-image/:dest", (req: any, res) => {
  upload(req, res, err => {
    console.log("req files", req.files);
    if (err) {
      // res.render("index", { msg: err });
      console.log("error message:", err);
    } else {
      // If file is not selected
      if (req.files == undefined) {
        // res.render("index", { msg: "No file selected!" });
        console.log("No file selected!");
      } else {
        // res.render("index", { msg: "File uploaded successfully!" });
        console.log("File uploaded successfully!");
      }
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
