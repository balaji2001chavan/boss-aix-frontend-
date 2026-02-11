async function callAIX(message) {
  try {
    const res = await fetch("/api/aix/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server error ${res.status}: ${text}`);
    }

    const data = await res.json();

    if (!data || !data.reply) {
      throw new Error("AIX कडून उत्तर मिळालं नाही (empty reply)");
    }

    return {
      ok: true,
      reply: data.reply
    };

  } catch (err) {
    return {
      ok: false,
      error: err.message
    };
  }
}
