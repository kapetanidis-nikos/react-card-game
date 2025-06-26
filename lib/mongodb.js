import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

const clientOptions = {
  serverApi: {
    version: "1",            // Use the Stable API version.
    strict: true,            // Warn when using unsupported features.
    deprecationErrors: true, // Treat deprecation warnings as errors.
  },
};

/** 
 * Cached connection for MongoDB.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, clientOptions)
      .then((mongoose) => {
        console.log('✅ Connected to MongoDB!');
        return mongoose;
      })
      .catch((err)=> console.error('❌ MongoDB Connection Error:', err))
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
