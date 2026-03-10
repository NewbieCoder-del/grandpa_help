function setupVoiceNavigation() {
  const micButton = document.getElementById("voiceCommandBtn");
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!micButton || !Recognition) {
    if (micButton) micButton.disabled = true;
    return;
  }

  const recognition = new Recognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;

  micButton.addEventListener("click", () => recognition.start());

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    routeVoiceCommand(transcript);
  };
}

function routeVoiceCommand(command) {
  if (command.includes("open pension")) return window.openWorkflow?.("pension");
  if (command.includes("open healthcare")) return window.openWorkflow?.("healthcare");
  if (command.includes("show documents")) return window.openWorkflow?.("documents");
  if (command.includes("pay electricity") || command.includes("pay bill")) return window.openWorkflow?.("bills");
  if (command.includes("go to home")) return window.goHome?.();
  if (command.includes("help me")) return alert("Please use Sahayak chat assistant at bottom-right for guided help.");
}

window.addEventListener("DOMContentLoaded", setupVoiceNavigation);
