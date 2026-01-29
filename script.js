const API = "https://allinonestopdeals.com/api/aix/chat";
const chat = document.getElementById("chat");

function add(text, cls) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const input = document.getElementById("msg");
  const text = input.value.trim();
  if (!text) return;

  add("You: " + text, "user");
  input.value = "";

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

  add(
    `AIX:\nIntent: ${data.intent}\nPlan: ${data.plan.join(" → ")}\n\n${data.result}`,
    "aix"
  );
}
