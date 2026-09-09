// ============================================
// SUPER ADMIN CONTROL PANEL
// ============================================
// Sipoze estrikti Firestore:
//   - Koleksyon "MAXIMAX"  -> chak dokiman se yon Super Admin
//       chan yo: email (string), ROLE (string), level (number), status (string)
//   - Koleksyon "admins"   -> chak dokiman se yon Admin regilye
//       chan yo: email (string), ROLE (string), status (string)
//
// Verifikasyon aksè: nou chèche nan koleksyon "MAXIMAX" yon dokiman
// kote chan "email" egal ak imèl moun ki konekte a. Si pa gen anyen,
// aksè refize.
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---- Konfigirasyon Firebase (menm konfig ak login.js) ----
const firebaseConfig = {
  apiKey: "AIzaSyB24Sbq_ud2qSFtdHwRhiKelokeIjCtDuY",
  authDomain: "briyant-soley-signo-1815.firebaseapp.com",
  projectId: "briyant-soley-signo-1815",
  storageBucket: "briyant-soley-signo-1815.firebasestorage.app",
  messagingSenderId: "873317957685",
  appId: "1:873317957685:web:1bb4bb30831a058399717c",
  measurementId: "G-QLDJNN876H",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SUPER_ADMIN_COLLECTION = "MAXIMAX";
const ADMIN_COLLECTION = "admins";

// ---- Eleman HTML ----
const loadingEl = document.getElementById("loading");
const accessDeniedEl = document.getElementById("accessDenied");
const panelEl = document.getElementById("panel");
const logoutBtn = document.getElementById("logoutBtn");

const superAdminListEl = document.getElementById("superAdminList");
const adminListEl = document.getElementById("adminList");

const superAdminEmailInput = document.getElementById("superAdminEmail");
const adminEmailInput = document.getElementById("adminEmail");
const addSuperAdminBtn = document.getElementById("addSuperAdminBtn");
const addAdminBtn = document.getElementById("addAdminBtn");

// ============================================
// 1. VERIFIKASYON AKSÈ
// ============================================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Pa konekte ditou -> voye tounen nan login
    window.location.href = "login.html";
    return;
  }

  try {
    const isSuperAdmin = await checkIsSuperAdmin(user.email);

    loadingEl.style.display = "none";

    if (isSuperAdmin) {
      panelEl.style.display = "block";
      loadSuperAdmins();
      loadAdmins();
    } else {
      accessDeniedEl.style.display = "block";
    }
  } catch (err) {
    console.error("Erè pandan verifikasyon aksè:", err);
    loadingEl.style.display = "none";
    accessDeniedEl.style.display = "block";
  }
});

async function checkIsSuperAdmin(email) {
  const q = query(
    collection(db, SUPER_ADMIN_COLLECTION),
    where("email", "==", email)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

// ============================================
// 2. LIS SUPER ADMIN
// ============================================
async function loadSuperAdmins() {
  superAdminListEl.innerHTML = "<li class='empty-msg'>Chaje...</li>";
  const snapshot = await getDocs(collection(db, SUPER_ADMIN_COLLECTION));

  if (snapshot.empty) {
    superAdminListEl.innerHTML =
      "<li class='empty-msg'>Pa gen Super Admin ankò.</li>";
    return;
  }

  superAdminListEl.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    superAdminListEl.appendChild(
      buildMemberRow(docSnap.id, data, SUPER_ADMIN_COLLECTION)
    );
  });
}

// ============================================
// 3. LIS ADMIN
// ============================================
async function loadAdmins() {
  adminListEl.innerHTML = "<li class='empty-msg'>Chaje...</li>";
  const snapshot = await getDocs(collection(db, ADMIN_COLLECTION));

  if (snapshot.empty) {
    adminListEl.innerHTML = "<li class='empty-msg'>Pa gen Admin ankò.</li>";
    return;
  }

  adminListEl.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    adminListEl.appendChild(buildMemberRow(docSnap.id, data, ADMIN_COLLECTION));
  });
}

// ---- Konstwi yon liy manm (itilize pou toude lis yo) ----
function buildMemberRow(docId, data, collectionName) {
  const li = document.createElement("li");

  const info = document.createElement("div");
  info.className = "member-info";

  const emailEl = document.createElement("span");
  emailEl.className = "member-email";
  emailEl.textContent = data.email || "(pa gen imèl)";

  const metaEl = document.createElement("span");
  metaEl.className = "member-meta";
  metaEl.textContent = `${data.ROLE || "—"} · ${data.status || "—"}`;

  info.appendChild(emailEl);
  info.appendChild(metaEl);

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Retire";
  removeBtn.addEventListener("click", () =>
    removeMember(docId, collectionName)
  );

  li.appendChild(info);
  li.appendChild(removeBtn);
  return li;
}

async function removeMember(docId, collectionName) {
  const confirmDelete = confirm("Ou sèten ou vle retire moun sa a?");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, collectionName, docId));
    if (collectionName === SUPER_ADMIN_COLLECTION) {
      loadSuperAdmins();
    } else {
      loadAdmins();
    }
  } catch (err) {
    console.error("Erè pandan efase manm nan:", err);
    alert("Yon erè rive pandan n ap retire moun sa a.");
  }
}

// ============================================
// 4. AJOUTE MANM NOUVO
// ============================================
addSuperAdminBtn.addEventListener("click", async () => {
  const email = superAdminEmailInput.value.trim();
  if (!email) return;

  try {
    await addDoc(collection(db, SUPER_ADMIN_COLLECTION), {
      email,
      ROLE: "super_admin",
      level: 1,
      status: "active",
    });
    superAdminEmailInput.value = "";
    loadSuperAdmins();
  } catch (err) {
    console.error("Erè pandan ajoute Super Admin:", err);
    alert("Yon erè rive pandan n ap ajoute Super Admin sa a.");
  }
});

addAdminBtn.addEventListener("click", async () => {
  const email = adminEmailInput.value.trim();
  if (!email) return;

  try {
    await addDoc(collection(db, ADMIN_COLLECTION), {
      email,
      ROLE: "admin",
      status: "active",
    });
    adminEmailInput.value = "";
    loadAdmins();
  } catch (err) {
    console.error("Erè pandan ajoute Admin:", err);
    alert("Yon erè rive pandan n ap ajoute Admin sa a.");
  }
});

// ============================================
// 5. DEKONEKTE
// ============================================
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

