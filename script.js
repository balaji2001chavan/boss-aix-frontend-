const chat = document.getElementById("chat");
const input = document.getElementById("input");
const statusBar = document.getElementById("status");

function addMessage(text, type = "aix") {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("🧑‍💻 " + text, "user");
  input.value = "";

  addMessage("🤖 AIX विचार करत आहे…", "system");
  statusBar.innerText = "🧠 AIX processing…";

  const result = await callAIX(text);

  // remove "thinking"
  chat.removeChild(chat.lastChild);

  if (result.ok) {
    addMessage("🤖 " + result.reply, "aix");
    statusBar.innerText = "✅ AIX ready";
  } else {
    addMessage(
      "❌ AIX ला अडचण आली.\n\nकारण:\n" + result.error,
      "error"
    );
    statusBar.innerText = "⚠️ AIX error – backend / AI check करा";
  }
}

// ENTER key support
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

// health check
(async function healthCheck() {
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    statusBar.innerText = `🟢 ${data.service} : ${data.status}`;
  } catch {
    statusBar.innerText = "🔴 Backend offline / nginx error";
  }
})();
