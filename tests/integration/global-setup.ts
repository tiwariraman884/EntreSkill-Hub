import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const setup = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.MONGODB_URI = uri;
  await mongoose.connect(uri);
  global.__MONGO_URI__ = uri;
  global.__MONGO_SERVER__ = mongod;
};

export default setup;
