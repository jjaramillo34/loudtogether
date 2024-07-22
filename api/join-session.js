const { connectToDatabase } = require("../lib/db");
const { joinSession } = require("../lib/sessions");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await connectToDatabase();

  const { sessionName } = req.body;

  try {
    const sessionData = await joinSession(sessionName);
    res.json(sessionData);
  } catch (error) {
    console.error("Error joining session:", error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Failed to join session" });
  }
};
