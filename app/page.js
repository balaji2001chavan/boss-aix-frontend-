"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const recognitionRef = useRef(null);

  // -------- SEND COMMAND --------
  async function sendCommand(text) {
  if (!text) return;

  setMessages(m => [...m, { role: "you", text }]);

  const res = await fetch("http://localhost:3000/api/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command: text })
  });

  const data = await res.json();

  let output = "";

  if (data.type === "SMART_ACTIVATION") {
    output =
      "✅ SMART APP ACTIVATION DONE\n\n" +
      "Activated:\n" +
      data.report.activated.join("\n") +
      "\n\nIgnored:\n" +
      data.report.ignored.join("\n");
  } else {
    output = JSON.stringify(data, null, 2);
  }

  setMessages(m => [...m, {
    role: "boss-aix",
    text: output
  }]);
}

  // -------- VOICE --------
  function startVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInput(text);
      sendCommand(text);
    };

    recognition.start();
    recognitionRef.current = recognition;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🎙️ Boss AIX – Voice Command</h2>

      <div style={{
        border: "1px solid #ccc",
        height: 300,
        padding: 10,
        overflow: "auto",
        marginBottom: 10
      }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b>
            <pre>{m.text}</pre>
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="बोल किंवा लिही…"
        style={{ width: "70%" }}
      />

      <button onClick={() => sendCommand(input)}>
        Send
      </button>

      <button onClick={startVoice} style={{ marginLeft: 10 }}>
        🎙️ Speak
      </button>
    </div>
  );
}