import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import { Mongoose } from "mongoose";
import { database } from "../models";
import RoleEnum from "../models/type/RoleEnum";

dotenv.config();

// EXPRESS
const app = express();
// MONGOOSE CONNECTION
const mongoose = new Mongoose();

database.mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initializeRoleCollection();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initializeRoleCollection() {
  database.Role.estimatedDocumentCount((error, count) => {
    if (!error && count === 0) {
      for (const role in RoleEnum) {
        new database.Role({
          name: role,
        }).save((error) => {
          if (error) {
            console.log("error", error);
          }
          console.log("added '" + role + "' to roles collection");
        });
      }
    }
  });
}

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
