import mongoose from "mongoose";
import logger from "./logger";

async function DBconnect() {
  const MongoUri = process.env.MONGO_URI!;

  // connect Mongo Database
  try {
    await mongoose.connect(MongoUri);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error(error, "Can not connect to DB: ");
  }
}

export default DBconnect;