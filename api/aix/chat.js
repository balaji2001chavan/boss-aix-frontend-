export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  res.status(200).json({
    reply: `🤖 AIX understood: "${message}". 
I will advise, engineer, and execute tasks to grow myself.`,
    mode: "AGENTIC"
  });
}
