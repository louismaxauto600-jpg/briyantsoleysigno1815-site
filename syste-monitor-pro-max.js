// =====================================
//  SYSTEM MONITOR PRO‑MAX (FINAL)
// =====================================

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  listAll
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import {
  getFunctions,
  httpsCallable
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const functions = getFunctions();

let CURRENT_ROLE = null;

// =====================================
//  CHECK USER + ROLE
// =====================================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const token = await user.getIdTokenResult();
  CURRENT_ROLE = token.claims.role || "admin";

  document.getElementById("roleChip").textContent = CURRENT_ROLE.toUpperCase();

  initSystemMonitor();
});

// =====================================
//  INIT SYSTEM MONITOR PRO‑MAX
// =====================================
function initSystemMonitor() {
  const refreshBtn = document.getElementById("sysRefreshBtn");
  if (refreshBtn) refreshBtn.onclick = runFullDiagnostics;

  runFullDiagnostics();
}

// =====================================
//  RUN FULL DIAGNOSTICS PRO‑MAX
// =====================================
async function runFullDiagnostics() {
  setStatus("firestoreStatus", "checking");
  setStatus("storageStatus", "checking");
  setStatus("functionsStatus", "checking");
  setStatus("securityStatus", "checking");

  await Promise.all([
    checkFirestore(),
    checkStorage(),
    checkFunctions(),
    checkSecurityConfig()
  ]);
}

// =====================================
//  STATUS HELPER
// =====================================
function setStatus(elementId, status) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.classList.remove("ok", "error", "checking");

  if (status === "ok") {
    el.classList.add("ok");
    el.textContent = "OK";
  } else if (status === "error") {
    el.classList.add("error");
    el.textContent = "ERROR";
  } else if (status === "checking") {
    el.classList.add("checking");
    el.textContent = "CHECKING…";
  }
}

// =====================================
//  FIRESTORE CHECK
// =====================================
async function checkFirestore() {
  try {
    const adminsSnap = await getDocs(collection(db, "admins"));
    const musiciansSnap = await getDocs(collection(db, "musicians"));
    const leadersSnap = await getDocs(collection(db, "leaders"));

    const countAdmins = adminsSnap.size;
    const countMusicians = musiciansSnap.size;
    const countLeaders = leadersSnap.size;

    const el = document.getElementById("firestoreDetails");
    if (el) {
      el.textContent =
        `Admins: ${countAdmins} | Mizisyen: ${countMusicians} | Lidè: ${countLeaders}`;
    }

    setStatus("firestoreStatus", "ok");
  } catch (err) {
    setStatus("firestoreStatus", "error");
    const el = document.getElementById("firestoreDetails");
    if (el) el.textContent = "Erè Firestore: " + err.message;
  }
}

// =====================================
//  STORAGE CHECK
// =====================================
async function checkStorage() {
  try {
    const brandingRef = ref(storage, "branding");
    await listAll(brandingRef);

    const el = document.getElementById("storageDetails");
    if (el) el.textContent = "Branding folder disponib.";

    setStatus("storageStatus", "ok");
  } catch (err) {
    setStatus("storageStatus", "error");
    const el = document.getElementById("storageDetails");
    if (el) el.textContent = "Erè Storage: " + err.message;
  }
}

// =====================================
//  FUNCTIONS CHECK
// =====================================
async function checkFunctions() {
  try {
    const pingFn = httpsCallable(functions, "pingSystemProMax");
    const res = await pingFn({});

    const el = document.getElementById("functionsDetails");
    if (el) el.textContent = "Fonksyon ap reponn: " + (res.data?.status || "OK");

    setStatus("functionsStatus", "ok");
  } catch (err) {
    setStatus("functionsStatus", "error");
    const el = document.getElementById("functionsDetails");
    if (el) el.textContent = "Erè Functions: " + err.message;
  }
}

// =====================================
//  SECURITY CONFIG CHECK
// =====================================
async function checkSecurityConfig() {
  try {
    const snap = await getDoc(doc(db, "security", "superadmins"));

    let count = 0;
    if (snap.exists()) {
      const data = snap.data();
      count = (data.uids || []).length;
    }

    const el = document.getElementById("securityDetails");
    if (el) el.textContent = `SUPER ADMINS anrejistre: ${count}`;

    setStatus("securityStatus", "ok");
  } catch (err) {
    setStatus("securityStatus", "error");
    const el = document.getElementById("securityDetails");
    if (el) el.textContent = "Erè Security: " + err.message;
  }
}
