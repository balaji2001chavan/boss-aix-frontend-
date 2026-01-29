// ===== AIX API CONFIG FINAL =====
const API_BASE = "http://allinonestopdeals.com";

// health check
async function checkHealth() {
  try {
    const r = await fetch(`${API_BASE}/api/health`);
    const j = await r.json();
    console.log("AIX health:", j);
  } catch (e) {
    console.error("Health fail", e);
  }
}

// chat send
async function sendMessage(msg) {
  const res = await fetch(`${API_BASE}/api/aix/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  return data.reply;
}
