
const API = "http://localhost:10000"; 
// Render वापरत असशील तर:
// const API = "https://boss-aix-backend-nai6.onrender.com";

const chat = document.getElementById("chat");
const statusEl = document.getElementById("status");
const projectsEl = document.getElementById("projects");

let currentProject = "General";

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function addProject(name) {
  if ([...projectsEl.children].some(p => p.innerText === name)) return;
  const div = document.createElement("div");
  div.className = "project";
  div.innerText = name;
  div.onclick = () => currentProject = name;
  projectsEl.appendChild(div);
}

async function send() {
  const input = document.getElementById("message");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "you");
  input.value = "";

  addProject(currentProject);

  const res = await fetch(API + "/api/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project: currentProject,
      message: text
    })
  });

  const data = await res.json();
  addMessage(data.reply, "aix");
}

setInterval(async () => {
  try {
    const res = await fetch(API + "/api/status");
    const data = await res.json();
    statusEl.innerText = "STATUS: " + data.mode;
  } catch {
    statusEl.innerText = "STATUS: Backend offline";
  }
}, 2000);

// Welcome
addMessage("नमस्कार बॉस 👋\nमी AIX Studio आहे. काय करू?", "aix");
