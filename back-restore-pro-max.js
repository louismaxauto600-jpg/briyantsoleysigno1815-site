// =====================================
//  BACKUP & RESTORE PRO‑MAX (FINAL)
// =====================================

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFunctions,
  httpsCallable
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";

const auth = getAuth();
const functions = getFunctions();

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

  initBackupRestoreProMax();
});

// =====================================
//  INIT BACKUP / RESTORE
// =====================================
function initBackupRestoreProMax() {
  if (CURRENT_ROLE !== "superadmin") {
    const container = document.getElementById("backupContainer");
    if (container) {
      container.innerHTML =
        "<h2 style='color:red;'>Aksè entèdi. SUPER ADMIN sèlman.</h2>";
    }
    return;
  }

  const backupBtn = document.getElementById("backupNowBtn");
  const restoreBtn = document.getElementById("restoreNowBtn");
  const backupStorageBtn = document.getElementById("backupStorageBtn");

  if (backupBtn) backupBtn.onclick = runBackupFirestoreProMax;
  if (restoreBtn) restoreBtn.onclick = runRestoreFirestoreProMax;
  if (backupStorageBtn) backupStorageBtn.onclick = runBackupStorageProMax;
}

// =====================================
//  BACKUP FIRESTORE
// =====================================
async function runBackupFirestoreProMax() {
  try {
    const fn = httpsCallable(functions, "backupFirestoreProMax");
    const res = await fn({ requestedBy: CURRENT_UID });

    alert("Backup Firestore lanse. Detay: " + (res.data?.message || "OK"));
  } catch (err) {
    alert("Erè pandan backup Firestore: " + err.message);
  }
}

// =====================================
//  RESTORE FIRESTORE
// =====================================
async function runRestoreFirestoreProMax() {
  const confirmRestore = confirm(
    "ATANSYON: Restore ap ranplase done aktyèl yo ak backup. Ou sèten?"
  );
  if (!confirmRestore) return;

  try {
    const fn = httpsCallable(functions, "restoreFirestoreProMax");
    const res = await fn({ requestedBy: CURRENT_UID });

    alert("Restore Firestore lanse. Detay: " + (res.data?.message || "OK"));
  } catch (err) {
    alert("Erè pandan restore Firestore: " + err.message);
  }
}

// =====================================
//  BACKUP STORAGE
// =====================================
async function runBackupStorageProMax() {
  try {
    const fn = httpsCallable(functions, "backupStorageProMax");
    const res = await fn({ requestedBy: CURRENT_UID });

    alert("Backup Storage lanse. Detay: " + (res.data?.message || "OK"));
  } catch (err) {
    alert("Erè pandan backup Storage: " + err.message);
  }
}
