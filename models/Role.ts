import { Schema, model } from "mongoose";

interface IRole {
  name: typeof import("./type/RoleEnum");
}

const Role = new Schema<IRole>({
  name: {
    type: String,
  },
});

export default model<IRole>("Role", Role);
