import mongoose from "mongoose";
import { User } from "./User";
import { Role } from "./Role";

interface Database {
  mongoose: typeof mongoose;
  User: typeof User;
  Role: typeof Role;
}

export const database: Database = {
  mongoose,
  User,
  Role,
};
