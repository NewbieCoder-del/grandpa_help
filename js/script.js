const services = [
  { id: "pension", title: "Pension Services", icon: "👵", desc: "Apply or track pension requests.", steps: ["Enter Aadhaar number", "OTP verification", "Select pension scheme", "Submit request"] },
  { id: "healthcare", title: "Healthcare Appointments", icon: "🏥", desc: "Book checkups and health visits.", steps: ["Choose hospital", "Select doctor", "Pick date and time", "Confirm appointment"] },
  { id: "documents", title: "DigiLocker Documents", icon: "📁", desc: "Access and download certificates.", steps: ["Enter mobile number", "Verify OTP", "Choose document", "Download"] },
  { id: "bills", title: "Utility Bill Payments", icon: "💡", desc: "Pay electricity and water bills.", steps: ["Enter consumer ID", "View bill amount", "Confirm payment", "Receipt generated"] },
  { id: "certificates", title: "Government Certificates", icon: "📜", desc: "Apply for essential certificates.", steps: ["Choose certificate type", "Upload details", "Verify information", "Submit application"] },
  { id: "help", title: "Help & Support", icon: "🆘", desc: "Contact support and guidance.", steps: ["Select issue", "Describe problem", "Choose callback method", "Submit help request"] }
];

let currentService = null;
let currentStep = 0;

function getEl(id) {
  return document.getElementById(id);
}

function speakText(message) {
  const voiceEnabled = localStorage.getItem("voiceGuidance") !== "off";
  if (!voiceEnabled || !("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 0.95;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function renderDashboard() {
  const grid = getEl("dashboardGrid");
  if (!grid) return;
  grid.innerHTML = services
    .map(
      (service) => `
      <article class="card" id="card-${service.id}">
        <div class="icon" aria-hidden="true">${service.icon}</div>
        <h3>${service.title}</h3>
        <p>${service.desc}</p>
        <button class="btn btn-primary" onclick="openWorkflow('${service.id}')">Open ${service.title}</button>
      </article>
    `
    )
    .join("");
}

function openWorkflow(serviceId) {
  const panel = getEl("workflowPanel");
  currentService = services.find((s) => s.id === serviceId);
  currentStep = 0;
  if (!currentService || !panel) return;
  panel.classList.add("active");
  updateWorkflowUI();
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
  speakText(`Welcome to ${currentService.title}. ${currentService.steps[0]}.`);
}

function updateWorkflowUI() {
  if (!currentService) return;
  getEl("workflowTitle").textContent = currentService.title;
  getEl("workflowStepLabel").textContent = `Step ${currentStep + 1} of ${currentService.steps.length}`;
  getEl("workflowContent").innerHTML = `<label>${currentService.steps[currentStep]}</label><input type="text" placeholder="Enter details" />`;
  getEl("workflowProgress").style.width = `${((currentStep + 1) / currentService.steps.length) * 100}%`;
}

function nextStep() {
  if (!currentService) return;
  if (window.SecurityGuard && !window.SecurityGuard.confirmSensitiveAction(currentService.id, currentStep)) return;
  if (currentStep < currentService.steps.length - 1) {
    currentStep += 1;
    updateWorkflowUI();
    speakText("Step completed. Please continue to the next step.");
  } else {
    getEl("workflowContent").innerHTML = "<p><strong>Request submitted successfully.</strong> Your application is under process.</p>";
    speakText("Your request is submitted successfully.");
  }
}

function cancelWorkflow() {
  const panel = getEl("workflowPanel");
  if (panel) panel.classList.remove("active");
  currentService = null;
  currentStep = 0;
}

function goHome() {
  window.location.href = window.location.pathname.includes("/pages/") ? "../index.html" : "index.html";
}

window.openWorkflow = openWorkflow;
window.goHome = goHome;

window.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
  const nextBtn = getEl("nextStepBtn");
  const cancelBtn = getEl("cancelWorkflowBtn");
  if (nextBtn) nextBtn.addEventListener("click", nextStep);
  if (cancelBtn) cancelBtn.addEventListener("click", cancelWorkflow);
});
