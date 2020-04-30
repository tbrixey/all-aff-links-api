var express = require("express");
var port = process.env.PORT || 3000;
var app = express();
require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  client.close();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "x-requested-with, content-type");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST");
  res.header("Access-Control-Allow-Credentials", "true");
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
