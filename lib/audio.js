const ytdl = require("@distube/ytdl-core");
const path = require("path");
const fs = require("fs");

const AUDIO_DIR = path.join("/tmp", "audio");

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

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

module.exports = { downloadAudio };
