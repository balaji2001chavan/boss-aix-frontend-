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
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();

        console.log("API RESPONSE 👉", data); // 🔥 MOST IMPORTANT

        const reply =
            data.reply ||
            data.message ||
            data.output ||
            data.response ||
            JSON.stringify(data);

        responseBox.innerText = "🤖 " + reply;

    } catch (error) {
        console.error(error);
        responseBox.innerText = "❌ Backend connect होत नाही";
    }
}
