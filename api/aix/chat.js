export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;

  return res.status(200).json({
    reply: `👩‍💻 AIX: I understood "${message}". I am alive and learning.`,
    mode: "AGENTIC"
  });
}
