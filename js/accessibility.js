function applyAccessibilitySettings() {
  const largeText = localStorage.getItem("largeText") === "on";
  const contrast = localStorage.getItem("highContrast") === "on";
  const dark = localStorage.getItem("darkMode") === "on";
  const kiosk = localStorage.getItem("kioskMode") === "on";

  document.documentElement.style.setProperty("--font-base", largeText ? "24px" : "20px");
  document.body.classList.toggle("high-contrast", contrast);
  document.body.classList.toggle("dark-mode", dark);
  document.body.classList.toggle("kiosk-mode", kiosk);

  const textToggle = document.getElementById("toggleTextSize");
  const contrastToggle = document.getElementById("toggleContrast");
  const voiceToggle = document.getElementById("toggleVoice");
  const darkToggle = document.getElementById("toggleDark");
  const lang = document.getElementById("languageSelector");

  if (textToggle) textToggle.checked = largeText;
  if (contrastToggle) contrastToggle.checked = contrast;
  if (voiceToggle) voiceToggle.checked = localStorage.getItem("voiceGuidance") !== "off";
  if (darkToggle) darkToggle.checked = dark;
  if (lang) lang.value = localStorage.getItem("language") || "en";
}

window.addEventListener("DOMContentLoaded", () => {
  applyAccessibilitySettings();

  const bindings = [
    ["toggleTextSize", "largeText"],
    ["toggleContrast", "highContrast"],
    ["toggleDark", "darkMode"]
  ];

  bindings.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("change", () => {
      localStorage.setItem(key, el.checked ? "on" : "off");
      applyAccessibilitySettings();
    });
  });

  const voice = document.getElementById("toggleVoice");
  if (voice) {
    voice.addEventListener("change", () => {
      localStorage.setItem("voiceGuidance", voice.checked ? "on" : "off");
    });
  }

  const lang = document.getElementById("languageSelector");
  if (lang) {
    lang.addEventListener("change", () => {
      localStorage.setItem("language", lang.value);
    });
  }

  const resetBtn = document.getElementById("resetAccessibility");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      ["largeText", "highContrast", "voiceGuidance", "darkMode", "language", "kioskMode"].forEach((k) => localStorage.removeItem(k));
      applyAccessibilitySettings();
    });
  }

  const kioskBtn = document.getElementById("kioskToggle");
  if (kioskBtn) {
    kioskBtn.addEventListener("click", () => {
      const on = localStorage.getItem("kioskMode") === "on";
      localStorage.setItem("kioskMode", on ? "off" : "on");
      kioskBtn.textContent = on ? "Enable Kiosk Mode" : "Disable Kiosk Mode";
      applyAccessibilitySettings();
    });
    kioskBtn.textContent = localStorage.getItem("kioskMode") === "on" ? "Disable Kiosk Mode" : "Enable Kiosk Mode";
  }
});
