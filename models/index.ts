import mongoose from "mongoose";
import User from "./User";
import RoleSchema from "./Role";

interface Database {
  mongoose: typeof mongoose;
  User: typeof User;
  Role: typeof RoleSchema;
}

export const database: Database = {
  mongoose,
  User,
  Role: RoleSchema,
};
