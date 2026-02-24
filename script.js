const chat = document.getElementById("chat");

function addMessage(text, type){
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage(){

  const input = document.getElementById("message");
  const message = input.value.trim();

  if(!message) return;

  addMessage(message,"user");
  input.value="";

  try{

    const res = await fetch("/api/chat",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({message})
    });

    const data = await res.json();

    addMessage(data.reply || "No reply","ai");

  }catch(err){
    addMessage("Server error ❌","ai");
    console.error(err);
  }
}

/* ENTER key support */
document.getElementById("message")
.addEventListener("keypress",e=>{
  if(e.key==="Enter") sendMessage();
});
