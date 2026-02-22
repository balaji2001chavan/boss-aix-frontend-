async function send() {
  const input = document.getElementById("msg");
  const chat = document.getElementById("chat");

  const text = input.value.trim();
  if (!text) return;

  chat.innerHTML = "⏳ AIX विचार करत आहे...";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    chat.innerHTML = data.reply || "⚠️ काहीतरी चूक झाली";
    input.value = "";

  } catch (err) {
    chat.innerHTML = "❌ Backend शी संपर्क होत नाही";
  }
}
