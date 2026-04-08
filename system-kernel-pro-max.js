// =============================================
// SYSTEM KERNEL PRO‑MAX
// Nwayo sekirite BSS1815
// - Token watchdog
// - Session integrity
// - Anti‑tampering
// - Role enforcement
// =============================================

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

// ---------------------------------------------
// WATCHDOG INTERVAL
// ---------------------------------------------
const WATCHDOG_INTERVAL = 8000; // chak 8 segonn

// ---------------------------------------------
// SESSION CHECK
// ---------------------------------------------
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    forceLogout("NO_USER");
    return;
  }

  try {
    const token = await user.getIdTokenResult(true);
    const role = token.claims.role || "admin";

    // ROLE ENFORCEMENT
    enforceRoleAccess(role);

    // START WATCHDOG
    startWatchdog(user, role);

  } catch (err) {
    console.error("Token error:", err);
    forceLogout("TOKEN_ERROR");
  }
});

// ---------------------------------------------
// WATCHDOG: verify token + integrity
// ---------------------------------------------
function startWatchdog(user, role) {
  setInterval(async () => {
    try {
      const token = await user.getIdTokenResult(true);

      // 1. Token expired
      if (!token || !token.claims) {
        forceLogout("TOKEN_INVALID");
        return;
      }

      // 2. Role mismatch (UI tampering)
      const realRole = token.claims.role || "admin";
      if (realRole !== role) {
        forceLogout("ROLE_TAMPER");
        return;
      }

      // 3. Hidden DOM tampering
      if (detectDomTampering()) {
        forceLogout("DOM_TAMPER");
        return;
      }

    } catch (err) {
      console.error("Watchdog error:", err);
      forceLogout("WATCHDOG_FAIL");
    }
  }, WATCHDOG_INTERVAL);
}

// ---------------------------------------------
// ROLE ACCESS CONTROL
// ---------------------------------------------
function enforceRoleAccess(role) {
  const path = window.location.pathname;

  const superOnly = [
    "role-manager-pro-max.html",
    "backup-restore-pro-max.html"
  ];

  if (superOnly.some(p => path.endsWith(p)) && role !== "superadmin") {
    window.location.href = "unauthorized.html";
  }
}

// ---------------------------------------------
// DOM TAMPERING DETECTOR
// ---------------------------------------------
function detectDomTampering() {
  const protectedIds = [
    "roleChip",
    "userName",
    "sidebar",
    "globalLoader"
  ];

  for (const id of protectedIds) {
    const el = document.getElementById(id);
    if (!el) return true;
  }

  return false;
}

// ---------------------------------------------
// FORCE LOGOUT
// ---------------------------------------------
function forceLogout(reason) {
  console.warn("FORCE LOGOUT:", reason);
  localStorage.setItem("logout_reason", reason);
  window.location.href = "login.html";
}
