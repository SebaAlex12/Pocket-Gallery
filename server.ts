import express = require("express");

const app: express.Application = express();

// console.log("12345");

app.get("/", function(req, res) {
  res.send("dsf");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
