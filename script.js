async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  document.getElementById("response").innerText =
    data.reply || "AIX silent mode 😴";
}
