async function send() {

  const input = document.getElementById("msg");
  const chat = document.getElementById("chat");

  const message = input.value;
  if (!message) return;

  chat.innerHTML += `<p class="user">👤 ${message}</p>`;
  input.value = "";

  try {

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    if (data.reply) {
      chat.innerHTML += `<p class="ai">🤖 ${data.reply}</p>`;
    } else {
      chat.innerHTML += `<p class="error">⚠️ No reply from AIX</p>`;
    }

  } catch (err) {
    chat.innerHTML += `<p class="error">❌ Server Error</p>`;
    console.error(err);
  }
}
