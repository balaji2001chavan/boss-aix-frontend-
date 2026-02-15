async function send() {
  const message = document.getElementById("msg").value;
  document.getElementById("reply").innerText = "⏳ विचार करत आहे...";

  try {
    const res = await fetch("/api/aix/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    document.getElementById("reply").innerText = data.reply || "उत्तर मिळाले नाही 😔";
  } catch (err) {
    document.getElementById("reply").innerText = "Server error 😵";
  }
}

/* ===== Marathi Voice ===== */
function speak() {
  const text = document.getElementById("reply").innerText;
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "mr-IN";
  speechSynthesis.speak(speech);
}
