import { model, models, Schema, type InferSchemaType } from "mongoose";

const MessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

export type MessageDocument = InferSchemaType<typeof MessageSchema>;

const Message = models.Message || model("Message", MessageSchema);

export default Message;
