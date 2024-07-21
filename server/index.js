const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const shortid = require("shortid");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const AUDIO_DIR = path.join(__dirname, "audio");

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR);
}

const MONGO_URI = process.env.REACT_APP_MONGO_URI;
const PORT = process.env.REACT_APP_PORT || 5000;

if (!MONGO_URI) {
  console.error("MONGO_URI is not set in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.error("MongoDB disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

const URLSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  shortId: { type: String, unique: true },
});

const URL = mongoose.model("URL", URLSchema);

app.use("/audio", (req, res) => {
  const filePath = path.join(AUDIO_DIR, req.url);
  console.log(`Requested audio file: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return res.status(404).send("File not found");
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  console.log(`File size: ${fileSize} bytes`);

  if (fileSize === 0) {
    console.log(`Empty file detected: ${filePath}`);
    return res.status(500).send("Empty audio file");
  }

  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize) {
      res.status(416).send("Requested range not satisfiable");
      return;
    }

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mp4",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "audio/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

const sessions = new Map();

const downloadAudio = (videoId) => {
  return new Promise((resolve, reject) => {
    const audioPath = path.join(AUDIO_DIR, `${videoId}.mp4`);

    if (fs.existsSync(audioPath)) {
      console.log(`Audio file already exists for video ${videoId}`);
      resolve(audioPath);
      return;
    }

    console.log(`Downloading audio for video ${videoId}`);
    const writeStream = fs.createWriteStream(audioPath);
    ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
      filter: "audioonly",
      quality: "highestaudio",
    }).pipe(writeStream);

    writeStream.on("finish", () => {
      console.log(`Downloaded audio for video ${videoId}`);
      const stats = fs.statSync(audioPath);
      console.log(`File size: ${stats.size} bytes`);
      if (stats.size > 0) {
        resolve(audioPath);
      } else {
        reject(new Error("Downloaded file is empty"));
      }
    });

    writeStream.on("error", (error) => {
      console.error(`Error writing audio for video ${videoId}:`, error);
      reject(error);
    });
  });
};

app.post("/create-session", async (req, res) => {
  const { url, sessionName } = req.body;
  console.log(`Creating session: ${sessionName}`);

  try {
    const videoId = ytdl.getVideoID(url);
    const videoInfo = await ytdl.getInfo(videoId);
    const videoTitle = videoInfo.videoDetails.title;

    let session = sessions.get(sessionName);

    if (session) {
      return res.status(400).json({ error: "Session name already exists" });
    }

    session = {
      id: sessionName,
      videoId,
      videoTitle,
      users: [],
      currentTime: 0,
      isPlaying: false,
      admin: null,
    };
    sessions.set(sessionName, session);

    try {
      await downloadAudio(videoId);
    } catch (error) {
      console.error("Failed to download audio:", error);
      return res.status(500).json({ error: "Failed to download audio" });
    }

    res.json({
      sessionName,
      videoId,
      videoTitle,
      audioUrl: `/audio/${videoId}.mp4`,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

app.post("/join-session", async (req, res) => {
  const { sessionName } = req.body;
  console.log(`Joining session: ${sessionName}`);
  let session = sessions.get(sessionName);

  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  const userName = `User${uuidv4().substr(0, 8)}`;
  session.users.push(userName);

  if (!session.admin) {
    session.admin = userName;
  }

  console.log(`User ${userName} joined session ${sessionName}`);

  res.json({
    userName,
    videoId: session.videoId,
    videoTitle: session.videoTitle,
    audioUrl: `/audio/${session.videoId}.mp4`,
    currentTime: session.currentTime,
    isPlaying: session.isPlaying,
    users: session.users,
    isAdmin: userName === session.admin,
  });
});

app.post("/shorten-url", async (req, res) => {
  const { longUrl } = req.body;
  try {
    let url = await URL.findOne({ originalUrl: longUrl });
    if (url) {
      res.json({
        shortUrl: `${req.protocol}://${req.get("host")}/${url.shortId}`,
        shareDate: url.shareDate,
        shareTime: url.shareTime,
      });
    } else {
      const shortId = shortid.generate();
      const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;
      const now = new Date();
      const shareDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
      const shareTime = now.toTimeString().split(" ")[0]; // HH:MM:SS
      url = new URL({
        originalUrl: longUrl,
        shortUrl,
        shortId,
        shareDate,
        shareTime,
      });
      await url.save();
      res.json({ shortUrl, shareDate, shareTime });
    }
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: "URL shortening failed" });
  }
});

app.get("/:shortId", async (req, res) => {
  try {
    const url = await URL.findOne({ shortId: req.params.shortId });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error("Error redirecting URL:", error);
    res.status(500).json({ error: "URL redirection failed" });
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");
  let currentSession = null;
  let currentUser = null;

  socket.on("join", ({ sessionName, userName }) => {
    if (currentSession && currentUser) {
      console.log(`User ${userName} already in session ${sessionName}`);
      return;
    }

    console.log(`Socket joining session: ${sessionName}`);
    socket.join(sessionName);
    currentSession = sessions.get(sessionName);
    currentUser = userName;

    if (currentSession) {
      if (!currentSession.users.includes(userName)) {
        currentSession.users.push(userName);
        io.to(sessionName).emit("userJoined", { users: currentSession.users });
      }

      socket.emit("syncTime", currentSession.currentTime);
      socket.emit("playbackState", {
        isPlaying: currentSession.isPlaying,
        currentTime: currentSession.currentTime,
      });
    }
  });

  socket.on("play", ({ sessionName }) => {
    console.log(`Play event received for session: ${sessionName}`);
    const session = sessions.get(sessionName);
    if (session && session.admin === currentUser) {
      session.isPlaying = true;
      io.to(sessionName).emit("play");
    }
  });

  socket.on("pause", ({ sessionName }) => {
    console.log(`Pause event received for session: ${sessionName}`);
    const session = sessions.get(sessionName);
    if (session && session.admin === currentUser) {
      session.isPlaying = false;
      io.to(sessionName).emit("pause");
    }
  });

  socket.on("seek", ({ sessionName, time }) => {
    console.log(
      `Seek event received for session: ${sessionName}, time: ${time}`
    );
    const session = sessions.get(sessionName);
    if (session && session.admin === currentUser) {
      session.currentTime = time;
      io.to(sessionName).emit("seek", time);
    }
  });

  socket.on("timeUpdate", ({ sessionName, currentTime }) => {
    const session = sessions.get(sessionName);
    if (session && session.admin === currentUser) {
      session.currentTime = currentTime;
      socket.to(sessionName).emit("syncTime", currentTime);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    if (currentSession && currentUser) {
      const index = currentSession.users.indexOf(currentUser);
      if (index > -1) {
        currentSession.users.splice(index, 1);
        io.to(currentSession.id).emit("userLeft", {
          users: currentSession.users,
        });

        if (
          currentSession.admin === currentUser &&
          currentSession.users.length > 0
        ) {
          currentSession.admin = currentSession.users[0];
          io.to(currentSession.id).emit("newAdmin", {
            admin: currentSession.admin,
          });
        }
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  });
});
