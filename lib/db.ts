import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? process.env.MONGO_URL;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const globalCache = globalThis.mongooseCache ?? { conn: null, promise: null };

export async function connectToDatabase() {
  const uri = MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI or MONGO_URL environment variable");
  }

  if (globalCache.conn) {
    return globalCache.conn;
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(uri, {
      bufferCommands: false
    });
  }

  globalCache.conn = await globalCache.promise;
  globalThis.mongooseCache = globalCache;

  return globalCache.conn;
}
