const API_BASE = "https://allinonestopdeals.com";

const chatBox = document.getElementById("chat");
const input = document.getElementById("message");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage("You: " + message, "user");
  input.value = "";

  try {
    const res = await fetch(`${API_BASE}/api/aix/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    if (!res.ok) {
      throw new Error("Server not reachable");
    }

    const data = await res.json();
    addMessage("AIX: " + (data.reply || "No reply"), "aix");

  } catch (err) {
    addMessage("AIX: Connection error ❌", "aix");
  }
}
