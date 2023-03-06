import { Schema, model } from "mongoose";

interface IUser {
  userName: string;
  email: string;
  password: string;
  roles: Array<Schema.Types.ObjectId>;
}

const UserSchema = new Schema<IUser>({
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

const User = model<IUser>("User", UserSchema);

export { User, IUser };
