import type { MessageRecord, UserRecord } from "@/types";

export type RawMessage = {
  _id: { toString(): string } | string;
  message: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type RawUser = {
  _id: { toString(): string } | string;
  username: string;
  email: string;
  url: string;
  acceptMessages: boolean;
  messages: RawMessage[];
};

export function serializeMessage(message: RawMessage): MessageRecord {
  return {
    _id: message._id.toString(),
    message: message.message,
    createdAt: new Date(message.createdAt).toISOString(),
    updatedAt: new Date(message.updatedAt).toISOString()
  };
}

export function serializeUser(user: RawUser): UserRecord {
  return {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    url: user.url,
    acceptMessages: user.acceptMessages,
    messages: user.messages.map(serializeMessage)
  };
}
