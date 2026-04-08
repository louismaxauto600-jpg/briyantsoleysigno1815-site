// =============================================
// DEPLOY CONFIG PRO‑MAX
// - Environment switching
// - Versioning
// - Safe mode
// - History tracking
// =============================================

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { showLoader, hideLoader } from "./ui-ux-pro-max-final.js";

const db = getFirestore();

// DOM
const envSelect = document.getElementById("envSelect");
const applyEnvBtn = document.getElementById("applyEnvBtn");

const versionInput = document.getElementById("versionInput");
const applyVersionBtn = document.getElementById("applyVersionBtn");

const enableSafeModeBtn = document.getElementById("enableSafeModeBtn");
const disableSafeModeBtn = document.getElementById("disableSafeModeBtn");

const envHistory = document.getElementById("envHistory");

// ---------------------------------------------
// LOAD CURRENT CONFIG
// ---------------------------------------------
async function loadConfig() {
  showLoader();

  const snap = await getDoc(doc(db, "system", "deploy_config"));

  if (snap.exists()) {
    const data = snap.data();
    envSelect.value = data.environment || "development";
    versionInput.value = data.version || "";
  }

  hideLoader();
}

// ---------------------------------------------
// APPLY ENVIRONMENT
// ---------------------------------------------
applyEnvBtn.onclick = async () => {
  const env = envSelect.value;

  showLoader();

  await setDoc(doc(db, "system", "deploy_config"), {
    environment: env
  }, { merge: true });

  await addDoc(collection(db, "deploy_history"), {
    type: "ENV_CHANGE",
    value: env,
    timestamp: serverTimestamp()
  });

  alert("Environment chanje.");
  hideLoader();
};

// ---------------------------------------------
// APPLY VERSION
// ---------------------------------------------
applyVersionBtn.onclick = async () => {
  const version = versionInput.value.trim();
  if (!version) return alert("Antre yon vèsyon.");

  showLoader();

  await setDoc(doc(db, "system", "deploy_config"), {
    version
  }, { merge: true });

  await addDoc(collection(db, "deploy_history"), {
    type: "VERSION_SET",
    value: version,
    timestamp: serverTimestamp()
  });

  alert("Vèsyon mete.");
  hideLoader();
};

// ---------------------------------------------
// SAFE MODE
// ---------------------------------------------
enableSafeModeBtn.onclick = async () => {
  showLoader();

  await setDoc(doc(db, "system", "deploy_config"), {
    safeMode: true
  }, { merge: true });

  await addDoc(collection(db, "deploy_history"), {
    type: "SAFE_MODE_ON",
    timestamp: serverTimestamp()
  });

  alert("Safe Mode aktive.");
  hideLoader();
};

disableSafeModeBtn.onclick = async () => {
  showLoader();

  await setDoc(doc(db, "system", "deploy_config"), {
    safeMode: false
  }, { merge: true });

  await addDoc(collection(db, "deploy_history"), {
    type: "SAFE_MODE_OFF",
    timestamp: serverTimestamp()
  });

  alert("Safe Mode dezaktive.");
  hideLoader();
};

// ---------------------------------------------
// HISTORY LISTENER
// ---------------------------------------------
const q = query(
  collection(db, "deploy_history"),
  orderBy("timestamp", "desc")
);

onSnapshot(q, (snapshot) => {
  envHistory.innerHTML = "";

  if (snapshot.empty) {
    envHistory.innerHTML = `<div class="item-card">Pa gen istwa pou kounya.</div>`;
    return;
  }

  snapshot.forEach((doc) => {
    const data = doc.data();

    const time = data.timestamp?.toDate
      ? data.timestamp.toDate().toLocaleString()
      : "—";

    const item = document.createElement("div");
    item.className = "item-card";

    item.innerHTML = `
      <div style="font-weight:600;">${data.type}</div>
      <div style="font-size:13px; margin-top:4px;">${data.value || ""}</div>
      <div style="font-size:12px; color:#888; margin-top:6px;">${time}</div>
    `;

    envHistory.appendChild(item);
  });
});

// INIT
loadConfig();
