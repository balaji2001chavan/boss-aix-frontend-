async function sendMessage() {
    const input = document.getElementById("message");
    const responseBox = document.getElementById("response");

    const text = input.value.trim();
    if (!text) {
        responseBox.innerText = "❌ Message लिही";
        return;
    }

    responseBox.innerText = "⏳ AI विचार करत आहे...";

    try {
        const res = await fetch("/api/aix/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await res.json();

        if (data.reply) {
            responseBox.innerText = "🤖 " + data.reply;
        } else {
            responseBox.innerText = "⚠️ AI कडून उत्तर नाही";
        }

    } catch (error) {
        console.error(error);
        responseBox.innerText = "❌ Backend connect होत नाही";
    }
}
