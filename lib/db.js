const mongoose = require("mongoose");

let isConnected = false;

const URLSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  shortId: { type: String, unique: true },
  shareDate: String,
  shareTime: String,
});

const URL = mongoose.model("URL", URLSchema);

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.REACT_APP_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = { connectToDatabase, URL };
