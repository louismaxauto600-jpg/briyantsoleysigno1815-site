// =============================================
// SYSTEM MONITOR PRO‑MAX
// - Firestore latency
// - Storage latency
// - Auth status
// - Network status
// - Browser status
// - Error tracking
// =============================================

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { showLoader, hideLoader } from "./ui-ux-pro-max-final.js";

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

// DOM
const firestoreLatency = document.getElementById("firestoreLatency");
const storageLatency = document.getElementById("storageLatency");
const authStatus = document.getElementById("authStatus");
const networkStatus = document.getElementById("networkStatus");
const systemErrors = document.getElementById("systemErrors");

// ---------------------------------------------
// FIRESTORE LATENCY TEST
// ---------------------------------------------
async function testFirestoreLatency() {
  const start = performance.now();
  await getDocs(collection(db, "admins"));
  const end = performance.now();

  firestoreLatency.textContent = `${Math.round(end - start)} ms`;
}

// ---------------------------------------------
// STORAGE LATENCY TEST
// ---------------------------------------------
async function testStorageLatency() {
  const start = performance.now();

  try {
    const testRef = ref(storage, "system/test.txt");
    await getDownloadURL(testRef);
    const end = performance.now();
    storageLatency.textContent = `${Math.round(end - start)} ms`;
  } catch {
    storageLatency.textContent = "N/A";
  }
}

// ---------------------------------------------
// AUTH STATUS
// ---------------------------------------------
function checkAuthStatus() {
  const user = auth.currentUser;
  authStatus.textContent = user ? "OK" : "NO USER";
}

// ---------------------------------------------
// NETWORK STATUS
// ---------------------------------------------
function updateNetworkStatus() {
  networkStatus.innerHTML = `
    <div class="item-card">
      <div>Online: ${navigator.onLine}</div>
      <div>Browser: ${navigator.userAgent}</div>
      <div>Platform: ${navigator.platform}</div>
      <div>Language: ${navigator.language}</div>
    </div>
  `;
}

// ---------------------------------------------
// ERROR TRACKING
// ---------------------------------------------
const errorLog = [];

window.onerror = (msg, src, line) => {
  errorLog.push({ msg, src, line, time: new Date() });
  renderErrors();
};

function renderErrors() {
  systemErrors.innerHTML = "";

  if (errorLog.length === 0) {
    systemErrors.innerHTML = `<div class="item-card">Pa gen erè pou kounya.</div>`;
    return;
  }

  errorLog.slice(-10).forEach((err) => {
    const item = document.createElement("div");
    item.className = "item-card";

    item.innerHTML = `
      <div style="font-weight:600;">${err.msg}</div>
      <div style="font-size:12px; color:#bbb;">${err.src} – line ${err.line}</div>
      <div style="font-size:12px; color:#888;">${err.time.toLocaleString()}</div>
    `;

    systemErrors.appendChild(item);
  });
}

// ---------------------------------------------
// INIT
// ---------------------------------------------
async function init() {
  showLoader();

  await testFirestoreLatency();
  await testStorageLatency();
  checkAuthStatus();
  updateNetworkStatus();
  renderErrors();

  hideLoader();
}

init();

// Auto-refresh every 10 seconds
setInterval(init, 10000);
