import express from "express";

const router = express.Router();

/**
 * GET /api/aix/chat
 * (frontend testing / browser open support)
 */
router.get("/chat", (req, res) => {
  return res.json({
    success: true,
    app: "AIX",
    mode: "AGENTIC",
    message: "AIX chat endpoint is alive. Use POST to chat.",
    serverTime: new Date().toISOString()
  });
});

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

    const reply = `
👋 Hello, I am AIX.

You said: "${message}"

System status:
✅ AWS: Connected
✅ NGINX: OK
✅ Backend: Running
✅ API: Stable

Tell me what you want to build, fix, or automate.
`.trim();

    return res.json({
      success: true,
      app: "AIX",
      reply,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error("AIX CHAT ERROR:", err);
    return res.status(500).json({
      success: false,
      error: "AIX internal error"
    });
  }
});

export default router;
