// =========================
//  BSS1815 ADMIN.JS FINAL
// =========================

// IMPORT FIREBASE
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();


// =========================
//  CHECK USER ROLE
// =========================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const token = await user.getIdTokenResult();
  const role = token.claims.role || "admin";

  document.getElementById("roleChip").textContent = role.toUpperCase();
  document.getElementById("settingsRole").textContent = role.toUpperCase();

  if (role === "superadmin") {
    document.getElementById("superAdminBadge").style.display = "block";
  } else {
    document.getElementById("adminBadge").style.display = "block";
  }

  loadAdmins();
  loadMusicians();
  loadLeaders();
});


// =========================
//  LOGOUT
// =========================
document.getElementById("logoutBtn").onclick = () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};


// =========================
//  LOAD ADMINS
// =========================
async function loadAdmins() {
  const list = document.getElementById("adminsList");
  list.innerHTML = "";

  const snap = await getDocs(collection(db, "admins"));
  snap.forEach((docu) => {
    const data = docu.data();

    list.innerHTML += `
      <div class="card">
        <h3>${data.name}</h3>
        <span>${data.role}</span>
      </div>
    `;
  });

  document.getElementById("totalAdmins").textContent = snap.size;
}


// =========================
//  ADD MUSICIAN
// =========================
document.getElementById("addMusicianBtn").onclick = async () => {
  const name = document.getElementById("m-name").value;
  const instrument = document.getElementById("m-instrument").value;
  const section = document.getElementById("m-section").value;
  const photo = document.getElementById("m-photo").files[0];

  if (!name || !instrument || !section) return;

  let photoURL = "";

  if (photo) {
    const path = `musicians/${Date.now()}-${photo.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, photo);
    photoURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "musicians"), {
    name,
    instrument,
    section,
    photo: photoURL
  });

  loadMusicians();
};


// =========================
//  LOAD MUSICIANS
// =========================
async function loadMusicians() {
  const list = document.getElementById("musiciansList");
  list.innerHTML = "";

  const snap = await getDocs(collection(db, "musicians"));
  snap.forEach((docu) => {
    const data = docu.data();

    list.innerHTML += `
      <div class="card">
        <h3>${data.name}</h3>
        <span>${data.instrument}</span>
        <small>${data.section}</small>
        ${data.photo ? `<img src="${data.photo}" style="width:100%;margin-top:8px;border-radius:8px;">` : ""}
      </div>
    `;
  });
}


// =========================
//  ADD LEADER
// =========================
document.getElementById("addLeaderBtn").onclick = async () => {
  const name = document.getElementById("l-name").value;
  const role = document.getElementById("l-role").value;
  const photo = document.getElementById("l-photo").files[0];

  if (!name || !role) return;

  let photoURL = "";

  if (photo) {
    const path = `leaders/${Date.now()}-${photo.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, photo);
    photoURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "leaders"), {
    name,
    role,
    photo: photoURL
  });

  loadLeaders();
};


// =========================
//  LOAD LEADERS
// =========================
async function loadLeaders() {
  const list = document.getElementById("leadersList");
  list.innerHTML = "";

  const snap = await getDocs(collection(db, "leaders"));
  snap.forEach((docu) => {
    const data = docu.data();

    list.innerHTML += `
      <div class="card">
        <h3>${data.name}</h3>
        <span>${data.role}</span>
        ${data.photo ? `<img src="${data.photo}" style="width:100%;margin-top:8px;border-radius:8px;">` : ""}
      </div>
    `;
  });
}


// =========================
//  FLYOUT SEND MESSAGE
// =========================
document.getElementById("sendMessageBtn").onclick = () => {
  const number = document.getElementById("flyoutNumber").value;
  const message = document.getElementById("flyoutMessage").value;

  if (!number || !message) return;

  alert("Mesaj pare pou voye.");
};
