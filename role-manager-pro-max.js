// =====================================
//  ROLE MANAGER PRO‑MAX (FINAL)
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
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getFunctions,
  httpsCallable
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";

const auth = getAuth();
const db = getFirestore();
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

  initRoleManagerProMax();
});

// =====================================
//  INIT ROLE MANAGER
// =====================================
function initRoleManagerProMax() {
  if (CURRENT_ROLE !== "superadmin") {
    const container = document.getElementById("roleManagerContainer");
    if (container) {
      container.innerHTML =
        "<h2 style='color:red;'>Aksè entèdi. SUPER ADMIN sèlman.</h2>";
    }
    return;
  }

  loadAdminsForRoleManager();

  const applyBtn = document.getElementById("roleApplyBtn");
  if (applyBtn) applyBtn.onclick = applyRoleChangeProMax;
}

// =====================================
//  LOAD ADMINS LIST
// =====================================
async function loadAdminsForRoleManager() {
  const list = document.getElementById("roleAdminList");
  if (!list) return;

  list.innerHTML = "Ap chaje lis admin yo…";

  try {
    const snap = await getDocs(collection(db, "admins"));
    list.innerHTML = "";

    snap.forEach((docu) => {
      const a = docu.data();
      const uid = docu.id;

      list.innerHTML += `
        <div class="role-card">
          <strong>${a.name || "San non"}</strong><br>
          <small>UID: ${uid}</small><br>
          <label>
            Wòl:
            <select data-uid="${uid}" class="role-select">
              <option value="admin"${a.role === "admin" ? " selected" : ""}>Admin</option>
              <option value="superadmin"${a.role === "superadmin" ? " selected" : ""}>Super Admin</option>
              <option value="viewer"${a.role === "viewer" ? " selected" : ""}>Viewer</option>
            </select>
          </label>
        </div>
      `;
    });
  } catch (err) {
    list.innerHTML = "Erè pandan chajman lis admin yo: " + err.message;
  }
}

// =====================================
//  APPLY ROLE CHANGE
// =====================================
async function applyRoleChangeProMax() {
  if (CURRENT_ROLE !== "superadmin") {
    alert("Aksyon sa a rezève pou SUPER ADMIN sèlman.");
    return;
  }

  const selects = document.querySelectorAll(".role-select");
  const updates = [];

  selects.forEach((sel) => {
    const uid = sel.getAttribute("data-uid");
    const role = sel.value;
    updates.push({ uid, role });
  });

  try {
    const setRoleFn = httpsCallable(functions, "setUserRoleProMax");
    await setRoleFn({ updates });

    // Update local admins collection roles
    for (const u of updates) {
      await updateDoc(doc(db, "admins", u.uid), { role: u.role });
    }

    alert("Wòl yo mete ajou ak siksè.");
  } catch (err) {
    alert("Erè pandan mete ajou wòl yo: " + err.message);
  }
}
