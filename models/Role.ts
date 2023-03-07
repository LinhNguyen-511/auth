import { Schema, model } from "mongoose";

interface IRole {
  name: typeof import("./type/RoleEnum");
}

const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
  },
});

const Role = model<IRole>("Role", RoleSchema);

export { Role, IRole };
