const { MongoClient } = require("mongodb");
require("dotenv").config();
// Connection URL
const url = process.env.MONGO_URL;

// Database Name
const dbName = process.env.DB_NAME;

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

exports.dbName = dbName;
exports.client = client;
