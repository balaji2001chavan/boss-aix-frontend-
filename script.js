async function send() {
  const msg = document.getElementById("msg").value;
  const replyBox = document.getElementById("reply");

  replyBox.innerText = "⏳ AIX विचार करतोय...";

  try {
    const res = await fetch("/api/aix/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    if (data.reply) {
      replyBox.innerText = data.reply;
    } else {
      replyBox.innerText = "⚠️ Reply मिळाला नाही (API response issue)";
    }
  } catch (err) {
    replyBox.innerHTML = `<span class="error">Error: ${err.message}</span>`;
  }
}
