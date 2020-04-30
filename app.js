var express = require("express");
var port = process.env.PORT || 3000;
var app = express();
require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = process.env.MONGO_URL;

// Database Name
const dbName = process.env.DB_NAME;

// Use connect method to connect to the server
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName, { useUnifiedTopology: true });

    client.close();
  }
);

app.get("/", function (req, res) {
  res.send(JSON.stringify({ Hello: "World" }));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
