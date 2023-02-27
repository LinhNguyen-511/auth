const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient } = require("mongodb");

dotenv.config();

// EXPRESS
const app = express();
// MONGODB CLIENT
const client = new MongoClient(process.env.MONGO_URI);

const connectToDatebase = async () => {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

connectToDatebase();

// CORS:
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// MIDDLEWAREs for parsing incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PORT:
const port = process.env.PORT;
app.listen(port, () => {
  console.log("halo");
});

app.get("/", (req, res) => {
  res.send("Hello bay!");
});
