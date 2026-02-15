async function sendMessage() {
  const input = document.getElementById("userInput");
  const responseBox = document.getElementById("response");

  const message = input.value;
  responseBox.innerText = "AIX विचार करत आहे... 🤔";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  responseBox.innerText = data.reply || "AIX शांत आहे 😴";
}
