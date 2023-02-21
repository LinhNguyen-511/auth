import mongoose from "mongoose";

const User = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  // An user can have multiple roles.
  // Each role has an id.
  // Ref helps us to get rest of the role's information (using populate()).
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export default mongoose.model("User", User);
