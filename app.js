var express = require("express");
var port = process.env.PORT || 3000;
var app = express();
require("dotenv").config();
const { client, dbName } = require("./mongo");
const assert = require("assert");

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
  client.connect((err) => {
    const db = client.db(dbName);
    const collection = db.collection("sites");
    collection
      .find({ name: { $regex: `.*${req.query.searchStr}.*` } })
      .toArray((err, result) => {
        assert.equal(err, null);

        res.json(result);
      });
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
