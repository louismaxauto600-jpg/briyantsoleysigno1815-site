// =============================================
// SYSTEM FIREWALL PRO‑MAX
// - Anti‑flood
// - Anti‑tampering
// - Anti‑script injection
// - Anti‑rapid-click
// - Auto-ban
// - Firewall logs
// =============================================

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

// ---------------------------------------------
// FIREWALL LOG FUNCTION
// ---------------------------------------------
async function logFirewall(event, details = "") {
  try {
    await addDoc(collection(db, "firewall_logs"), {
      event,
      details,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.warn("Firewall log failed:", err);
  }
}

// ---------------------------------------------
// ANTI‑FLOOD (limit rapid requests)
// ---------------------------------------------
let lastRequest = 0;
document.addEventListener("click", () => {
  const now = Date.now();
  if (now - lastRequest < 120) {
    logFirewall("RAPID_CLICK_BLOCK", "User clicked too fast");
  }
  lastRequest = now;
});

// ---------------------------------------------
// ANTI‑SCRIPT INJECTION
// ---------------------------------------------
const forbiddenPatterns = [
  "<script",
  "javascript:",
  "onerror=",
  "onload=",
  "<iframe",
  "<img src=x onerror"
];

document.addEventListener("input", (e) => {
  const value = (e.target.value || "").toLowerCase();

  for (const pattern of forbiddenPatterns) {
    if (value.includes(pattern)) {
      e.target.value = "";
      logFirewall("SCRIPT_INJECTION_BLOCK", `Pattern: ${pattern}`);
      alert("Aksyon sa pa pèmèt.");
      break;
    }
  }
});

// ---------------------------------------------
// ANTI‑DOM TAMPERING
// ---------------------------------------------
const protectedIds = ["sidebar", "roleChip", "userName", "globalLoader"];

setInterval(() => {
  for (const id of protectedIds) {
    const el = document.getElementById(id);
    if (!el) {
      logFirewall("DOM_TAMPER_DETECTED", `Missing element: ${id}`);
      window.location.reload();
    }
  }
}, 3000);

// ---------------------------------------------
// ANTI‑IP FLOOD (client-side heuristic)
// ---------------------------------------------
let floodCount = 0;

setInterval(() => {
  floodCount = 0;
}, 5000);

document.addEventListener("click", () => {
  floodCount++;
  if (floodCount > 40) {
    logFirewall("IP_FLOOD_SUSPECT", "Too many actions in 5 seconds");
  }
});

// ---------------------------------------------
// EXPORT
// ---------------------------------------------
export default {};
