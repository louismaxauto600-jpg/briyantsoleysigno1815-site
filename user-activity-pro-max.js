// =====================================
//  USER ACTIVITY ENGINE PRO‑MAX (FINAL)
// =====================================
//
//  FICHYE SA A:
//  - Log tout aksyon admin yo
//  - Log login, logout, efase, ajoute, modifye
//  - SUPER ADMIN ka wè tout logs
//  - ADMIN ka wè sèlman logs pa yo
//
// =====================================

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
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

  await loadActivityLogs();
});

// =====================================
//  LOG ACTIVITY PRO‑MAX
// =====================================
export async function logActivity(action, details = "") {
  try {
    await addDoc(collection(db, "activity_logs"), {
      uid: CURRENT_UID,
      role: CURRENT_ROLE,
      action,
      details,
      timestamp: Date.now()
    });
  } catch (err) {
    console.error("Activity log error:", err.message);
  }
}

// =====================================
//  LOAD ACTIVITY LOGS PRO‑MAX
// =====================================
async function loadActivityLogs() {
  const list = document.getElementById("activityList");
  list.innerHTML = "";

  let q;

  if (CURRENT_ROLE === "superadmin") {
    q = query(
      collection(db, "activity_logs"),
      orderBy("timestamp", "desc")
    );
  } else {
    q = query(
      collection(db, "activity_logs"),
      where("uid", "==", CURRENT_UID),
      orderBy("timestamp", "desc")
    );
  }

  const snap = await getDocs(q);

  snap.forEach((docu) => {
    const log = docu.data();

    list.innerHTML += `
      <div class="log-card">
        <h4>${log.action}</h4>
        <p>${log.details || ""}</p>
        <small>
          UID: ${log.uid} | Wòl: ${log.role} <br>
          ${new Date(log.timestamp).toLocaleString()}
        </small>
      </div>
    `;
  });
}

// =====================================
//  QUICK LOG HELPERS PRO‑MAX
// =====================================
export function logLogin() {
  logActivity("Login", "Itilizatè a konekte.");
}

export function logLogout() {
  logActivity("Logout", "Itilizatè a dekonekte.");
}

export function logCreate(item) {
  logActivity("Create", `Kreye nouvo: ${item}`);
}

export function logDelete(item) {
  logActivity("Delete", `Efase: ${item}`);
}

export function logUpdate(item) {
  logActivity("Update", `Modifye: ${item}`);
}
