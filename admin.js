// admin.js — BSS1815 OFFICIAL ADMIN PANEL ENGINE
// Using Firebase Modular SDK v10

import { auth, db, storage } from "./firebase.js";

import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";


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

  // Load modules
  loadAdmins();
  loadMusicians();
  loadLeaders();
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



// ======================================================
//  🔥🔥🔥 MUSICIANS MODULE — BSS1815 OFFICIAL
// ======================================================

const addMusicianBtn = document.getElementById("addMusicianBtn");
const musiciansList = document.getElementById("musiciansList");

addMusicianBtn.addEventListener("click", addMusician);


// ADD MUSICIAN
async function addMusician() {
  const name = document.getElementById("m-name").value.trim();
  const instrument = document.getElementById("m-instrument").value.trim();
  const section = document.getElementById("m-section").value.trim();
  const file = document.getElementById("m-photo").files[0];

  if (!name || !instrument || !section) {
    alert("Ranpli tout chan yo.");
    return;
  }

  let photoURL = "";

  if (file) {
    const storageRef = ref(storage, "musicians/" + Date.now() + "-" + file.name);
    await uploadBytes(storageRef, file);
    photoURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "musicians"), {
    name,
    instrument,
    section,
    photoURL
  });

  alert("Mizisyen an ajoute!");
  loadMusicians();
}


// LOAD MUSICIANS
async function loadMusicians() {
  const snap = await getDocs(collection(db, "musicians"));
  musiciansList.innerHTML = "";

  snap.forEach((docSnap) => {
    const m = docSnap.data();
    const id = docSnap.id;

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${m.photoURL || 'default.png'}" style="width:100%;border-radius:8px;margin-bottom:8px;">
      <h3>${m.name}</h3>
      <span>${m.instrument}</span>
      <small>${m.section}</small>

      <button onclick="deleteMusician('${id}')"
        style="margin-top:10px;background:#b30000;color:white;">
        Efase
      </button>
    `;

    musiciansList.appendChild(div);
  });
}


// DELETE MUSICIAN
window.deleteMusician = async function(id) {
  if (!confirm("Ou vle efase mizisyen sa a?")) return;

  await deleteDoc(doc(db, "musicians", id));
  loadMusicians();
};



// ======================================================
//  🔥🔥🔥 LEADERS MODULE — BSS1815 OFFICIAL
// ======================================================

const addLeaderBtn = document.getElementById("addLeaderBtn");
const leadersList = document.getElementById("leadersList");

addLeaderBtn.addEventListener("click", addLeader);


// ADD LEADER
async function addLeader() {
  const name = document.getElementById("l-name").value.trim();
  const role = document.getElementById("l-role").value.trim();
  const file = document.getElementById("l-photo").files[0];

  if (!name || !role) {
    alert("Ranpli tout chan yo.");
    return;
  }

  let photoURL = "";

  if (file) {
    const storageRef = ref(storage, "leaders/" + Date.now() + "-" + file.name);
    await uploadBytes(storageRef, file);
    photoURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "leaders"), {
    name,
    role,
    photoURL
  });

  alert("Lidè a ajoute!");
  loadLeaders();
}


// LOAD LEADERS
async function loadLeaders() {
  const snap = await getDocs(collection(db, "leaders"));
  leadersList.innerHTML = "";

  snap.forEach((docSnap) => {
    const l = docSnap.data();
    const id = docSnap.id;

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${l.photoURL || 'default.png'}" style="width:100%;border-radius:8px;margin-bottom:8px;">
      <h3>${l.name}</h3>
      <span>${l.role}</span>

      <button onclick="deleteLeader('${id}')"
        style="margin-top:10px;background:#b30000;color:white;">
        Efase
      </button>
    `;

    leadersList.appendChild(div);
  });
}


// DELETE LEADER
window.deleteLeader = async function(id) {
  if (!confirm("Ou vle efase lidè sa a?")) return;

  await deleteDoc(doc(db, "leaders", id));
  loadLeaders();
};
