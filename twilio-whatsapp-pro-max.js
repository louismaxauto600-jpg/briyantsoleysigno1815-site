// =====================================
//  TWILIO WHATSAPP PRO‑MAX (FINAL)
// =====================================
//
//  FRONTEND → CLOUD FUNCTION → TWILIO
//
//  FICHYE SA A:
//  - Voye WhatsApp mesaj PRO‑MAX
//  - Sipòte mesaj rapid, mesaj long, templates
//  - Sekirite: sèlman admin + superadmin
//
// =====================================

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFunctions,
  httpsCallable
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";

const auth = getAuth();
const functions = getFunctions();

let CURRENT_ROLE = null;

// =====================================
//  CHECK USER + ROLE
// =====================================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const token = await user.getIdTokenResult();
  CURRENT_ROLE = token.claims.role || "admin";

  document.getElementById("roleChip").textContent = CURRENT_ROLE.toUpperCase();

  initWhatsAppEngine();
});

// =====================================
//  INIT WHATSAPP ENGINE PRO‑MAX
// =====================================
function initWhatsAppEngine() {
  const sendBtn = document.getElementById("waSendBtn");
  const testBtn = document.getElementById("waTestBtn");
  const templateSelect = document.getElementById("waTemplate");

  if (sendBtn) sendBtn.onclick = sendWhatsAppProMax;
  if (testBtn) testBtn.onclick = sendWhatsAppTestProMax;
  if (templateSelect) templateSelect.onchange = applyTemplate;
}

// =====================================
//  APPLY TEMPLATE PRO‑MAX
// =====================================
function applyTemplate() {
  const templateSelect = document.getElementById("waTemplate");
  const msgInput = document.getElementById("waMessage");

  const value = templateSelect.value;

  if (value === "welcome") {
    msgInput.value =
      "Byenveni nan BSS 1815! Nou kontan gen ou avè nou. Respè total.";
  } else if (value === "reminder") {
    msgInput.value =
      "Rappel: Repetisyon / evènman BSS 1815 ap fèt talè. Tanpri rive alè.";
  } else if (value === "custom") {
    msgInput.value = "";
  }
}

// =====================================
//  SEND WHATSAPP MESSAGE PRO‑MAX
// =====================================
async function sendWhatsAppProMax() {
  const phoneInput = document.getElementById("waPhone");
  const msgInput = document.getElementById("waMessage");

  const phone = (phoneInput.value || "").trim();
  const message = (msgInput.value || "").trim();

  if (!phone || !message) {
    alert("Tanpri antre nimewo + mesaj.");
    return;
  }

  try {
    const sendFn = httpsCallable(functions, "sendWhatsAppProMax");
    await sendFn({ phone, message });

    alert("WhatsApp PRO‑MAX voye ak siksè.");
  } catch (err) {
    alert("Erè pandan voye WhatsApp la: " + err.message);
  }
}

// =====================================
//  SEND TEST WHATSAPP PRO‑MAX
// =====================================
async function sendWhatsAppTestProMax() {
  const phoneInput = document
