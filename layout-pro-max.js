// =====================================
//  LAYOUT PRO‑MAX (FINAL)
// =====================================

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

// =====================================
//  CHECK USER + ROLE
// =====================================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const token = await user.getIdTokenResult();
  const role = token.claims.role || "admin";

  document.getElementById("roleChip").textContent = role.toUpperCase();

  await loadBrandingPreview();
});

// =====================================
//  LOAD BRANDING PREVIEW (LOGO + NAME)
// =====================================
async function loadBrandingPreview() {
  const snap = await getDoc(doc(db, "branding", "global"));
  if (!snap.exists()) return;

  const data = snap.data();

  const logo = document.querySelector(".koukou-logo img");
  const title = document.querySelector(".brand-title");

  if (data.logoURL) logo.src = data.logoURL;
  if (data.name) title.textContent = data.name;
}

// =====================================
//  NAVIGATION PRO‑MAX
// =====================================
const navBtns = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");
const pageTitle = document.getElementById("pageTitle");

navBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    navBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const target = btn.dataset.target;

    pageTitle.textContent =
      target.charAt(0).toUpperCase() + target.slice(1);

    sections.forEach((sec) => sec.classList.remove("active"));
    document.getElementById("section-" + target).classList.add("active");
  });
});

// =====================================
//  LOGOUT PRO‑MAX
// =====================================
document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};
