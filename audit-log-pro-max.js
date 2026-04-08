// =====================================
//  AUDIT LOG PRO‑MAX (FINAL)
// =====================================
//
//  FICHYE SA A:
//  - SUPER ADMIN sèlman ka wè tout logs
//  - Log Firestore, Storage, Functions, Auth
//  - Filtraj PRO‑MAX: pa aksyon, pa UID, pa dat
//  - Vizyalizasyon an tan reyèl
//
// =====================================

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

let CURRENT_UID = null;
let CURRENT_ROLE = null;
let SUPERADMINS = [];

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

  await loadSuperAdmins();
  enforceAccess();
});

// =====================================
//  LOAD SUPER ADMINS
// =====================================
async function loadSuperAdmins() {
  const snap = await getDoc(doc(db, "security", "superadmins"));
  if (snap.exists()) SUPERADMINS = snap.data().uids || [];
}

// =====================================
//  ENFORCE ACCESS CONTROL
// =====================================
function enforceAccess() {
  if (!SUPERADMINS.includes(CURRENT_UID)) {
    document.getElementById("auditContainer").innerHTML =
      "<h2 style='color:red;'>Aksè entèdi. SUPER ADMIN sèlman.</h2>";
    return;
  }

  initAuditEngine();
}

// =====================================
//  INIT AUDIT ENGINE PRO‑MAX
// =====================================
function initAuditEngine() {
  attachFilters();
  loadAuditLogs();
}

// =====================================
//  ATTACH FILTERS PRO‑MAX
// =====================================
function attachFilters() {
  const fAction = document.getElementById("f-action");
  const fUID = document.getElementById("f-uid");
  const fDate = document.getElementById("f-date");

  const apply = () => loadAuditLogs(
    fAction.value.trim(),
    fUID.value.trim(),
    fDate.value.trim()
  );

  fAction.addEventListener("input", apply);
  fUID.addEventListener("input", apply);
  fDate.addEventListener("change", apply);
}

// =====================================
//  LOAD AUDIT LOGS (REAL‑TIME)
// =====================================
function loadAuditLogs(filterAction = "", filterUID = "", filterDate = "") {
  const list = document.getElementById("auditList");
  list.innerHTML = "";

  let q = query(
    collection(db, "audit_logs"),
    orderBy("timestamp", "desc")
  );

  onSnapshot(q, (snap) => {
    list.innerHTML = "";

    snap.forEach((docu) => {
      const log = docu.data();

      if (filterAction && !log.action.toLowerCase().includes(filterAction.toLowerCase()))
        return;

      if (filterUID && log.uid !== filterUID)
        return;

      if (filterDate) {
        const logDate = new Date(log.timestamp).toISOString().split("T")[0];
        if (logDate !== filterDate) return;
      }

      list.innerHTML += `
        <div class="audit-card">
          <h3>${log.action}</h3>
          <p>${log.details || ""}</p>
          <small>
            UID: ${log.uid} | Wòl: ${log.role}<br>
            ${new Date(log.timestamp).toLocaleString()}
          </small>
        </div>
      `;
    });
  });
}

// =====================================
//  EXPORT LOG (SUPER ADMIN ONLY)
// =====================================
window.exportAuditLogs = async () => {
  if (!SUPERADMINS.includes(CURRENT_UID)) {
    alert("Aksyon sa a rezève pou SUPER ADMIN sèlman.");
    return;
  }

  const snap = await getDocs(collection(db, "audit_logs"));
  const rows = [];

  snap.forEach((d) => rows.push(d.data()));

  const data = JSON.stringify(rows, null, 2);

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "audit-log-pro-max.json";
  a.click();

  URL.revokeObjectURL(url);
};
