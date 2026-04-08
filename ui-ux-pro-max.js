// =====================================
// UI-UX PRO‑MAX (BASE VERSION)
// - Senp
// - Fonksyonèl
// - San bèlte initil
// =====================================

import {
  getAuth,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

// USER + ROLE DISPLAY
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const roleChip = document.getElementById("roleChip");
  const userName = document.getElementById("userName");

  const token = await user.getIdTokenResult();
  const role = token.claims.role || "admin";

  if (roleChip) roleChip.textContent = role.toUpperCase();
  if (userName) userName.textContent = user.email || "User";
});

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };
}

// LOADER
export function showLoader() {
  const el = document.getElementById("globalLoader");
  if (el) el.style.display = "block";
}

export function hideLoader() {
  const el = document.getElementById("globalLoader");
  if (el) el.style.display = "none";
}

// SIMPLE ACTIVE NAV
const navLinks = document.querySelectorAll("[data-route]");
if (navLinks.length) {
  const current = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    if (link.getAttribute("data-route") === current) {
      link.classList.add("active");
    }
  });
}
