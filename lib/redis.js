const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
  url: `redis://:${process.env.REACT_APP_REDIS_PASS}@${process.env.REACT_APP_REDIS_HOST}:${process.env.REACT_APP_REDIS_PORT}`,
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.connect().catch(console.error); // Ensure the client connects

module.exports = client;
