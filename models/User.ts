import { model, models, Schema, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    url: {
      type: String,
      required: true
    },
    acceptMessages: {
      type: Boolean,
      default: false
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message"
      }
    ]
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof UserSchema>;

const User = models.User || model("User", UserSchema);

export default User;
