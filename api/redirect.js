const { connectToDatabase } = require("../lib/db");
const { URL } = require("../lib/db");

module.exports = async (req, res) => {
  await connectToDatabase();

  const { shortId } = req.query;

  try {
    const url = await URL.findOne({ shortId });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error("Error redirecting URL:", error);
    res.status(500).json({ error: "URL redirection failed" });
  }
};
