// =============================================
// REPORTS PRO‑MAX
// - Ranmase done
// - Montre estatistik
// - Rezime aktivite
// =============================================

import {
  getFirestore,
  collection,
  getCountFromServer,
  query,
  orderBy,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { showLoader, hideLoader } from "./ui-ux-pro-max-final.js";

const db = getFirestore();

// DOM
const reportAdmins = document.getElementById("reportAdmins");
const reportMusicians = document.getElementById("reportMusicians");
const reportVideos = document.getElementById("reportVideos");
const activitySummary = document.getElementById("activitySummary");

// Loader ON
showLoader();

// ---------------------------------------------
// COUNT COLLECTIONS
// ---------------------------------------------
async function loadCounts() {
  const adminsSnap = await getCountFromServer(collection(db, "admins"));
  const musiciansSnap = await getCountFromServer(collection(db, "musicians"));
  const videosSnap = await getCountFromServer(collection(db, "videos"));

  reportAdmins.textContent = adminsSnap.data().count;
  reportMusicians.textContent = musiciansSnap.data().count;
  reportVideos.textContent = videosSnap.data().count;
}

// ---------------------------------------------
// ACTIVITY SUMMARY
// ---------------------------------------------
async function loadActivitySummary() {
  const logsRef = collection(db, "audit_logs");
  const q = query(logsRef, orderBy("timestamp", "desc"), limit(20));

  const snap = await getDocs(q);

  activitySummary.innerHTML = "";

  if (snap.empty) {
    activitySummary.innerHTML = `
      <div class="item-card">Pa gen aktivite pou kounya.</div>
    `;
    return;
  }

  snap.forEach((doc) => {
    const data = doc.data();

    const item = document.createElement("div");
    item.className = "item-card";

    const time = data.timestamp?.toDate
      ? data.timestamp.toDate().toLocaleString()
      : "—";

    item.innerHTML = `
      <div style="font-weight:600; margin-bottom:4px;">
        ${data.action || "Aksyon enkoni"}
      </div>

      <div style="font-size:12px; color:#bbb;">
        Pa: ${data.user || "—"}
      </div>

      <div style="font-size:12px; color:#888;">
        Lè: ${time}
      </div>
    `;

    activitySummary.appendChild(item);
  });
}

// ---------------------------------------------
// INIT
// ---------------------------------------------
(async () => {
  await loadCounts();
  await loadActivitySummary();
  hideLoader();
})();
