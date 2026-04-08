// =====================================
//  MAIN ADMIN ROUTER PRO‑MAX (FINAL)
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

let currentRole = null;

// =====================================
//  CHECK USER + ROLE
// =====================================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const token = await user.getIdTokenResult();
  currentRole = token.claims.role || "admin";

  document.getElementById("roleChip").textContent = currentRole.toUpperCase();

  await loadBrandingPreview();
  initRouter();
});

// =====================================
//  LOAD BRANDING PREVIEW
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
//  ROUTER MAP PRO‑MAX
// =====================================
const ROUTES = {
  dashboard: "dashboard-pro-max.html",
  admins: "admin-manager-pro-max.html",
  musicians: "musician-engine-pro-max.html",
  leaders: "leader-engine-pro-max.html",
  videos: "videos-pro-max.html",
  branding: "branding-pro-max.html",
  settings: "settings-pro-max.html"
};

// =====================================
//  LOAD PAGE INSIDE MAIN PANEL
// =====================================
async function loadPage(page) {
  const container = document.getElementById("mainContent");

  if (!ROUTES[page]) {
    container.innerHTML = `<p style="color:red;">Page not found.</p>`;
    return;
  }

  const url = ROUTES[page];
  const html = await fetch(url).then((r) => r.text());

  container.innerHTML = html;
}

// =====================================
//  INIT ROUTER PRO‑MAX
// =====================================
function initRouter() {
  const navBtns = document.querySelectorAll(".nav-btn");
  const pageTitle = document.getElementById("pageTitle");

  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      navBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.dataset.target;

      pageTitle.textContent =
        target.charAt(0).toUpperCase() + target.slice(1);

      loadPage(target);
    });
  });

  loadPage("dashboard");
}

// =====================================
//  LOGOUT PRO‑MAX
// =====================================
document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};
