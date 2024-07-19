const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");
const redis = require("redis");
require("dotenv").config(); // Load environment variables

const redisClient = redis.createClient({
  url: `redis://:${process.env.REACT_APP_REDIS_PASSWORD}@${process.env.REACT_APP_REDIS_HOST}:${process.env.REACT_APP_REDIS_PORT}`,
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.connect().catch(console.error);

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const getVideoTitle = async (videoId) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
    );
    return response.data.items[0].snippet.title;
  } catch (error) {
    console.error("Error fetching video title:", error);
    return "Unknown Title";
  }
};

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { url } = req.body;
    const sessionId = uuidv4();
    const sessionName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: "-",
    });
    const videoId = url.split("v=")[1] || url.split("youtu.be/")[1];
    const videoTitle = await getVideoTitle(videoId);

    const sessionData = {
      videoId,
      videoTitle,
      id: sessionId,
      name: sessionName,
      users: [],
      admin: null,
    };

    await redisClient.set(sessionName, JSON.stringify(sessionData));
    console.log("Session created:", sessionData);
    res.status(200).json({ sessionName, sessionId });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
