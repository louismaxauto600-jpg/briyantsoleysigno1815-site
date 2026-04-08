// =====================================
//  DASHBOARD PRO‑MAX (FINAL)
// =====================================
//
//  FICHYE SA A:
//  - Chaje estatistik an tan reyèl
//  - Konte admins, mizisyen, lidè, videyo
//  - Montre dènye aktivite
//  - SUPER ADMIN resevwa done konplè
//  - ADMIN resevwa done limite
//
// =====================================

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

let CURRENT_ROLE = null;
let CURRENT_UID = null;

// =====================================
//  CHECK USER + ROLE
// =====================================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  CURRENT_UID = user.uid;

  const token = await user.getIdTokenResult();
  CURRENT_ROLE = token.claims.role || "admin";

  const roleChip = document.getElementById("roleChip");
  if (roleChip) roleChip.textContent = CURRENT_ROLE.toUpperCase();

  await loadDashboardStats();
  await loadRecentActivity();
});

// =====================================
//  LOAD DASHBOARD STATS PRO‑MAX
// =====================================
async function loadDashboardStats() {
  const adminCountEl = document.getElementById("statAdmins");
  const musicianCountEl = document.getElementById("statMusicians");
  const leaderCountEl = document.getElementById("statLeaders");
  const videoCountEl = document.getElementById("statVideos");

  try {
    const adminsSnap = await getDocs(collection(db, "admins"));
    const musiciansSnap = await getDocs(collection(db, "musicians"));
    const leadersSnap = await getDocs(collection(db, "leaders"));
    const videosSnap = await getDocs(collection(db, "videos"));

    if (adminCountEl) adminCountEl.textContent = adminsSnap.size;
    if (musicianCountEl) musicianCountEl.textContent = musiciansSnap.size;
    if (leaderCountEl) leaderCountEl.textContent = leadersSnap.size;
    if (videoCountEl) videoCountEl.textContent = videosSnap.size;

  } catch (err) {
    console.error("Dashboard stats error:", err.message);
  }
}

// =====================================
//  LOAD RECENT ACTIVITY PRO‑MAX
// =====================================
async function loadRecentActivity() {
  const list = document.getElementById("recentActivity");
  if (!list) return;

  list.innerHTML = "";

  try {
    let q;

    if (CURRENT_ROLE === "superadmin") {
      q = query(
        collection(db, "activity_logs"),
        orderBy("timestamp", "desc"),
        limit
