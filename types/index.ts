export type MessageRecord = {
  _id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type UserRecord = {
  _id: string;
  username: string;
  email: string;
  url: string;
  acceptMessages: boolean;
  messages: MessageRecord[];
};
