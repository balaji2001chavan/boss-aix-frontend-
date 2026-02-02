const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

const API_URL = "https://allinonestopdeals.com/api/aix/chat";

function addMessage(text, cls) {
  const div = document.createElement("div");
  div.className = `msg ${cls}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

send.onclick = async () => {
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  addMessage("AIX is thinking...", "aix");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    chat.lastChild.remove();
    addMessage(data.reply || "No response", "aix");

  } catch (err) {
    chat.lastChild.remove();
    addMessage("⚠ Connection error. Backend not reachable.", "aix");
  }
};
