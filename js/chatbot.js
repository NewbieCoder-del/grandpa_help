const botReplies = {
  pension: "To apply for pension: open Pension Services, enter Aadhaar, verify OTP, choose your scheme, and submit.",
  electricity: "To pay electricity bill: open Utility Bill Payments, enter consumer ID, verify bill amount, and confirm payment.",
  documents: "To download documents: open DigiLocker Documents, verify OTP, choose document, and click download.",
  default: "I can help with pension, healthcare appointments, documents, bills, and safety guidance."
};

function getBotReply(text) {
  const input = text.toLowerCase();
  if (input.includes("pension")) return botReplies.pension;
  if (input.includes("electricity") || input.includes("bill")) return botReplies.electricity;
  if (input.includes("document") || input.includes("digilocker")) return botReplies.documents;
  if (input.includes("health")) return "For healthcare appointments, choose hospital, doctor, date, and confirm your booking.";
  return botReplies.default;
}

function addMessage(container, text, className) {
  const div = document.createElement("div");
  div.className = `message ${className}`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

window.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("chatToggle");
  const body = document.getElementById("chatBody");
  const send = document.getElementById("chatSend");
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");

  if (!toggle || !body || !send || !input || !messages) return;

  addMessage(messages, "Namaste! I am Sahayak. How can I help you today?", "bot");

  toggle.addEventListener("click", () => body.classList.toggle("open"));

  const sendMessage = () => {
    const text = input.value.trim();
    if (!text) return;
    addMessage(messages, text, "user");
    const reply = getBotReply(text);
    setTimeout(() => addMessage(messages, reply, "bot"), 300);
    input.value = "";
  };

  send.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
