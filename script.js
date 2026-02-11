async function sendMessage() {
    const input = document.getElementById("message");
    const responseBox = document.getElementById("response");

    const text = input.value.trim();
    if (!text) {
        responseBox.innerText = "❌ Please type something";
        return;
    }

    responseBox.innerText = "⏳ Thinking...";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();

        if (data.reply) {
            responseBox.innerText = "🤖 " + data.reply;
        } else {
            responseBox.innerText = "⚠️ No reply from AI";
        }

    } catch (err) {
        responseBox.innerText = "❌ Server error";
        console.error(err);
    }
}
