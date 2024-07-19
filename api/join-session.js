const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");
const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.connect().catch(console.error);

const emojis = [
  "😀",
  "😎",
  "🥳",
  "🤩",
  "👍",
  "🔥",
  "💥",
  "🌟",
  "🎉",
  "🎊",
  "🚀",
  "🎈",
  "🎁",
  "🎶",
  "🎵",
  "🎤",
  "🎸",
  "🎹",
  "🥁",
  "🎷",
  "🎺",
  "🎻",
  "🪕",
  "🎼",
  "🎧",
  "🎚",
  "🎛",
  "🎙",
  "📯",
  "🎥",
  "📽",
  "🎞",
  "📸",
  "📷",
  "📹",
  "📺",
  "📻",
  "🎚",
];

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { sessionName } = req.body;
    const sessionData = JSON.parse(await redisClient.get(sessionName));
    if (!sessionData) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const userName = `${uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    })} ${randomEmoji}`;
    sessionData.users.push(userName);

    if (!sessionData.admin) {
      sessionData.admin = userName;
    }

    await redisClient.set(sessionName, JSON.stringify(sessionData));
    res.status(200).json({
      videoId: sessionData.videoId,
      videoTitle: sessionData.videoTitle,
      sessionName: sessionData.name,
      userName,
      admin: sessionData.admin,
      users: sessionData.users,
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
