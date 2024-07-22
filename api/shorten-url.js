const { connectToDatabase } = require("../lib/db");
const { URL } = require("../lib/db");
const shortid = require("shortid");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await connectToDatabase();

  const { longUrl } = req.body;

  try {
    let url = await URL.findOne({ originalUrl: longUrl });
    if (url) {
      res.json({
        shortUrl: `${process.env.VERCEL_URL}/${url.shortId}`,
        shareDate: url.shareDate,
        shareTime: url.shareTime,
      });
    } else {
      const shortId = shortid.generate();
      const shortUrl = `${process.env.VERCEL_URL}/${shortId}`;
      const now = new Date();
      const shareDate = now.toISOString().split("T")[0];
      const shareTime = now.toTimeString().split(" ")[0];
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
};
