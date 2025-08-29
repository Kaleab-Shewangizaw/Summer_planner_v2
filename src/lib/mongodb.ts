import mongoose, { Connection } from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) throw new Error("MONGODB_URI missing");

let cached: { conn: Connection | null; promise: Promise<Connection> | null } = (
  global as any
).mongoose || { conn: null, promise: null };

export default async function connectMongo(): Promise<Connection> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((m) => m.connection);
    (global as any).mongoose = cached;
  }
  cached.conn = await cached.promise;
  console.log("mongodb connected");
  return cached.conn;
}
