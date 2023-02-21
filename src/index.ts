const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");

dotenv.config();

// EXPRESS
const app = express();

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
