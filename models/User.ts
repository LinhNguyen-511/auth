import { Schema, model } from "mongoose";

interface IUser {
  userName: string;
  email: string;
  password: string;
  roles: typeof import("./type/RoleEnum");
}

const User = new Schema<IUser>({
  userName: String,
  email: String,
  password: String,
  // An user can have multiple roles.
  // Each role has an id.
  // Ref helps us to get rest of the role's information (using populate()).
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export default model<IUser>("User", User);
