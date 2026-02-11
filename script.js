const chatBox = document.getElementById("chat");
const input = document.getElementById("message");

// Backend base (nginx proxy वापरतोय)
const API = "/api/aix/chat";

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("You: " + text, "user");
  input.value = "";

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    if (data.reply) {
      addMessage("AIX: " + data.reply, "aix");
    } else {
      addMessage("AIX: No response", "aix");
    }
  } catch (err) {
    addMessage("AIX: Server error", "aix");
  }
}
