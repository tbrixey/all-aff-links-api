var express = require("express");
var port = process.env.PORT || 3000;
var app = express();
require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = process.env.MONGO_URL;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  client.close();
});

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", function (req, res) {
  res.send(JSON.stringify({ Hello: "World" }));
});

app.get("/sites", (req, res) => {
  console.log("SITES", req.query);
  res.send({ data: "yo" });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
