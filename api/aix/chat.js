import express from "express";
import fetch from "node-fetch";

const router = express.Router();

/**
 * POST /api/aix/chat
 * body: { message: string }
 */
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    // 👉 SIMPLE SMART AIX CORE (expand later)
    const reply = `
Hello 👋 I am AIX.

You said: "${message}"

Status:
- Backend: RUNNING
- AWS: CONNECTED
- NGINX: OK
- API: ACTIVE

Tell me what you want to build, fix, or grow.
    `.trim();

    return res.json({
      success: true,
      app: "AIX",
      mode: "AGENTIC",
      reply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("AIX CHAT ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "AIX internal error"
    });
  }
});

export default router;
