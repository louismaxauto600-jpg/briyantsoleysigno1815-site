// =============================================
// BACKUP & RESTORE PRO‑MAX
// - Kreye backup
// - Restore backup
// - Lis backup yo
// =============================================

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { showLoader, hideLoader } from "./ui-ux-pro-max-final.js";

const db = getFirestore();

// DOM
const createBackupBtn = document.getElementById("createBackupBtn");
const restoreBackupBtn = document.getElementById("restoreBackupBtn");
const backupIdInput = document.getElementById("backupIdInput");
const backupList = document.getElementById("backupList");

// ---------------------------------------------
// CREATE BACKUP
// ---------------------------------------------
createBackupBtn.onclick = async () => {
  showLoader();

  try {
    const backupId = crypto.randomUUID();
    const timestamp = new Date();

    // Backup collections
    const collectionsToBackup = ["admins", "musicians", "videos"];

    const backupData = {};

    for (const col of collectionsToBackup) {
      const snap = await getDocs(collection(db, col));
      backupData[col] = [];

      snap.forEach((doc) => {
        backupData[col].push({
          id: doc.id,
          ...doc.data()
        });
      });
    }

    await setDoc(doc(db, "backups", backupId), {
      timestamp,
      data: backupData
    });

    alert("Backup kreye avèk siksè.");
    loadBackups();

  } catch (err) {
    console.error(err);
    alert("Erè pandan backup la.");
  }

  hideLoader();
};

// ---------------------------------------------
// RESTORE BACKUP
// ---------------------------------------------
restoreBackupBtn.onclick = async () => {
  const backupId = backupIdInput.value.trim();
  if (!backupId) return alert("Antre ID backup la.");

  showLoader();

  try {
    const backupDoc = await getDoc(doc(db, "backups", backupId));

    if (!backupDoc.exists()) {
      alert("Backup sa pa egziste.");
      hideLoader();
      return;
    }

    const data = backupDoc.data().data;

    for (const col in data) {
      for (const item of data[col]) {
        await setDoc(doc(db, col, item.id), item);
      }
    }

    alert("Restore fèt avèk siksè.");

  } catch (err) {
    console.error(err);
    alert("Erè pandan restore la.");
  }

  hideLoader();
};

// ---------------------------------------------
// LIST BACKUPS
// ---------------------------------------------
async function loadBackups() {
  backupList.innerHTML = "";
  showLoader();

  const snap = await getDocs(collection(db, "backups"));

  if (snap.empty) {
    backupList.innerHTML = `
      <div class="item-card">Pa gen backup pou kounya.</div>
    `;
    hideLoader();
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
      <div style="font-weight:600;">Backup ID: ${doc.id}</div>
      <div style="font-size:12px; color:#bbb;">Kreye: ${time}</div>
    `;

    backupList.appendChild(item);
  });

  hideLoader();
}

// INIT
loadBackups();
