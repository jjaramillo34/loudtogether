const { connectToDatabase } = require("../lib/db");
const { createSession } = require("../lib/sessions");
const { downloadAudio } = require("../lib/audio");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await connectToDatabase();

  const { url, sessionName } = req.body;

  try {
    const session = await createSession(url, sessionName);
    await downloadAudio(session.videoId);

    res.json({
      sessionName: session.id,
      videoId: session.videoId,
      videoTitle: session.videoTitle,
      audioUrl: `/audio/${session.videoId}.mp4`,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
};
