// admin.js — BSS1815 OFFICIAL ADMIN PANEL ENGINE
// Using Firebase Modular SDK v10

import { auth, db } from "./firebase.js";
import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// -------------------------------
//  DOM ELEMENTS
// -------------------------------
const superAdminBadge = document.getElementById("superAdminBadge");
const adminBadge = document.getElementById("adminBadge");
const roleChip = document.getElementById("roleChip");
const settingsRole = document.getElementById("settingsRole");
const adminsList = document.getElementById("adminsList");
const totalAdmins = document.getElementById("totalAdmins");


// -------------------------------
//  AUTH STATE LISTENER
// -------------------------------
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    alert("Aksè pa otorize.");
    await signOut(auth);
    return;
  }

  const data = snap.data();
  const role = data.role || "unknown";
  const name = data.name || user.email || "User";

  // -------------------------------
  //  ROLE DISPLAY + BADGES
  // -------------------------------
  if (role === "super_admin") {
    roleChip.textContent = "SUPER ADMIN — " + name;
    settingsRole.textContent = "SUPER ADMIN";
    superAdminBadge.style.display = "block";
    adminBadge.style.display = "none";
  }
  else if (role === "admin") {
    roleChip.textContent = "ADMIN — " + name;
    settingsRole.textContent = "ADMIN";
    adminBadge.style.display = "block";
    superAdminBadge.style.display = "none";
  }
  else {
    roleChip.textContent = "UNKNOWN ROLE";
    settingsRole.textContent = "UNKNOWN";
  }

  // Load admin list
  loadAdmins();
});


// -------------------------------
//  LOGOUT
// -------------------------------
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});


// -------------------------------
//  LOAD ADMINS
// -------------------------------
async function loadAdmins() {
  const colRef = collection(db, "users");
  const snap = await getDocs(colRef);

  adminsList.innerHTML = "";
  let count = 0;

  snap.forEach((docSnap) => {
    const u = docSnap.data();
    if (!u.role) return;

    const isAdmin = (u.role === "admin" || u.role === "super_admin");
    if (!isAdmin) return;

    count++;

    const div = document.createElement("div");
    div.className = "card";

    const roleLabel = (u.role === "super_admin") ? "SUPER ADMIN" : "ADMIN";
    const pills = [];

    if (u.role === "super_admin") pills.push("Full Access");
    else pills.push("Limited Access");

    div.innerHTML = `
      <h3>${u.name || "San non"}</h3>
      <span>${roleLabel}</span>
      <small>${u.email || ""}</small>
      <div class="pill-row">
        ${pills.map(p => `<div class="pill">${p}</div>`).join("")}
      </div>
    `;

    adminsList.appendChild(div);
  });

  totalAdmins.textContent = count + " admin anrejistre";
}
