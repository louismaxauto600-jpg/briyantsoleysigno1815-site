// =====================================
//  SETTINGS PRO‑MAX (FINAL)
// =====================================

import {
  getAuth,
  onAuthStateChanged,
  updatePassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

let CURRENT_UID = null;
let CURRENT_ROLE = null;

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

  document.getElementById("roleChip").textContent = CURRENT_ROLE.toUpperCase();

  await loadProfileSettings();
});

// =====================================
//  LOAD PROFILE SETTINGS
// =====================================
async function loadProfileSettings() {
  const snap = await getDoc(doc(db, "admins", CURRENT_UID));

  if (!snap.exists()) return;

  const data = snap.data();

  document.getElementById("s-name").value = data.name || "";
  document.getElementById("s-email").value = data.email || "";
}

// =====================================
//  SAVE PROFILE SETTINGS
// =====================================
document.getElementById("saveProfileBtn").onclick = async () => {
  const name = document.getElementById("s-name").value.trim();
  const email = document.getElementById("s-email").value.trim();

  if (!name || !email) return;

  try {
    await setDoc(
      doc(db, "admins", CURRENT_UID),
      { name, email, updatedAt: Date.now() },
      { merge: true }
    );

    alert("Profil mete ajou ak siksè.");
  } catch (err) {
    alert("Erè: " + err.message);
  }
};

// =====================================
//  CHANGE PASSWORD PRO‑MAX
// =====================================
document.getElementById("changePassBtn").onclick = async () => {
  const newPass = document.getElementById("s-pass").value.trim();

  if (!newPass) return;

  try {
    await updatePassword(auth.currentUser, newPass);
    document.getElementById("s-pass").value = "";
    alert("Modpas mete ajou ak siksè.");
  } catch (err) {
    alert("Erè: " + err.message);
  }
};

// =====================================
//  SYSTEM SETTINGS (SUPER ADMIN ONLY)
// =====================================
document.getElementById("saveSystemBtn").onclick = async () => {
  if (CURRENT_ROLE !== "superadmin") {
    alert("Aksyon sa a rezève pou SUPER ADMIN sèlman.");
    return;
  }

  const systemName = document.getElementById("sys-name").value.trim();
  const systemMode = document.getElementById("sys-mode").value;

  try {
    await setDoc(
      doc(db, "system", "config"),
      {
        systemName,
        systemMode,
        updatedAt: Date.now()
      },
      { merge: true }
    );

    alert("Konfigirasyon sistèm mete ajou ak siksè.");
  } catch (err) {
    alert("Erè: " + err.message);
  }
};
