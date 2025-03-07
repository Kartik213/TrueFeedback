import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    url: {
      type: String,
      required: true,
    },
    acceptMessages: {
      type: Boolean,
      default: false,
    },
    messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
