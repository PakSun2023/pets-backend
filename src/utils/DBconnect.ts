import mongoose from "mongoose";

async function DBconnect() {
    const MongoUri = process.env.MONGO_URI!;

  try {
    await mongoose.connect(MongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Can not connect to DB: ", error);
  }
}

export default DBconnect;