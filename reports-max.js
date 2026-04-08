// =====================================
//  REPORTS PRO‑MAX (FINAL)
// =====================================

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

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

  initReportsProMax();
});

// =====================================
//  INIT REPORTS ENGINE
// =====================================
function initReportsProMax() {
  const genSummaryBtn = document.getElementById("repSummaryBtn");
  const exportJsonBtn = document.getElementById("repExportJsonBtn");

  if (genSummaryBtn) genSummaryBtn.onclick = generateSummaryReport;
  if (exportJsonBtn) exportJsonBtn.onclick = exportFullReportJson;
}

// =====================================
//  GENERATE SUMMARY REPORT
// =====================================
async function generateSummaryReport() {
  const out = document.getElementById("repSummaryOutput");
  if (out) out.textContent = "Ap kalkile rapò…";

  try {
    const adminsSnap = await getDocs(collection(db, "admins"));
    const musiciansSnap = await getDocs(collection(db, "musicians"));
    const leadersSnap = await getDocs(collection(db, "leaders"));
    const videosSnap = await getDocs(collection(db, "videos"));

    const summary = {
      generatedAt: new Date().toISOString(),
      totals: {
        admins: adminsSnap.size,
        musicians: musiciansSnap.size,
        leaders: leadersSnap.size,
        videos: videosSnap.size
      }
    };

    if (out) {
      out.textContent = JSON.stringify(summary, null, 2);
    }
  } catch (err) {
    if (out) out.textContent = "Erè pandan rapò a: " + err.message;
  }
}

// =====================================
//  EXPORT FULL REPORT (JSON)
// =====================================
async function exportFullReportJson() {
  try {
    const activityQ = query(
      collection(db, "activity_logs"),
      orderBy("timestamp", "desc")
    );
    const activitySnap = await getDocs(activityQ);

    const logs = [];
    activitySnap.forEach((d) => logs.push(d.data()));

    const report = {
      generatedAt: new Date().toISOString(),
      by: CURRENT_UID,
      role: CURRENT_ROLE,
      activityLogs: logs
    };

    const data = JSON.stringify(report, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bss1815-report-pro-max.json";
    a.click();

    URL.revokeObjectURL(url);
  } catch (err) {
    alert("Erè pandan ekspòtasyon rapò a: " + err.message);
  }
}
