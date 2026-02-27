const mongoose = require("../server/config/mongoose");

const app = require("../server/app");

const globalCache = global;
if (!globalCache.mongooseConnection) {
  globalCache.mongooseConnection = { conn: null, promise: null };
}

async function connectDB() {
  if (globalCache.mongooseConnection.conn) {
    return globalCache.mongooseConnection.conn;
  }

  if (!globalCache.mongooseConnection.promise) {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("Missing MONGO_URI");
    }

    globalCache.mongooseConnection.promise = mongoose.connect(mongoUri).then((mongooseInstance) => mongooseInstance);
  }

  globalCache.mongooseConnection.conn = await globalCache.mongooseConnection.promise;
  return globalCache.mongooseConnection.conn;
}

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("API startup error:", error);
    return res.status(500).json({ message: "API startup failed" });
  }
};
