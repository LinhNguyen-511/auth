import mongoose from "mongoose";

const Role = new mongoose.Schema({
  name: {
    type: String,
    enum: ["general", "admin"],
  },
});

export default mongoose.model("Role", Role);
