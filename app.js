const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const { client, dbName } = require("./mongo");
const assert = require("assert");

app.use(bodyParser.json());

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
      .find({
        $or: [
          { name: { $regex: `.*${req.query.searchStr}.*` } },
          { url: { $regex: `.*${req.query.searchStr}.*` } },
        ],
      })
      .toArray((err, result) => {
        assert.equal(err, null);
        const randomMonth = result[Math.floor(Math.random() * result.length)];
        collection.findOneAndUpdate(
          { _id: randomMonth._id },
          { $inc: { pulled: 1 } },
          { upsert: false }
        );
        res.json(randomMonth);
      });
  });
});

app.post("/sites", (req, res) => {
  client.connect((err) => {
    const db = client.db(dbName);
    const collection = db.collection("sites");
    collection
      .insertOne({
        name: req.body.name,
        url: req.body.url,
      })
      .then((doc) => {
        res.send("OK");
      });
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
