// =============================================
// NOTIFICATION ENGINE PRO‑MAX
// - Voye notifikasyon
// - Filtre pa wòl
// - Istwa notifikasyon
// - Live updates
// =============================================

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { showLoader, hideLoader } from "./ui-ux-pro-max-final.js";

const db = getFirestore();
const auth = getAuth();

// DOM
const notifTitle = document.getElementById("notifTitle");
const notifMessage = document.getElementById("notifMessage");
const notifTarget = document.getElementById("notifTarget");
const sendNotifBtn = document.getElementById("sendNotifBtn");
const notifList = document.getElementById("notifList");

// ---------------------------------------------
// SEND NOTIFICATION
// ---------------------------------------------
sendNotifBtn.onclick = async () => {
  const title = notifTitle.value.trim();
  const message = notifMessage.value.trim();
  const target = notifTarget.value;

  if (!title || !message) return alert("Ranpli tout chan yo.");

  const user = auth.currentUser;
  if (!user) return alert("Ou pa konekte.");

  showLoader();

  try {
    await addDoc(collection(db, "notifications"), {
      title,
      message,
      target,
      sender: user.email,
      timestamp: serverTimestamp()
    });

    notifTitle.value = "";
    notifMessage.value = "";

    alert("Notifikasyon voye.");

  } catch (err) {
    console.error(err);
    alert("Erè pandan voye notifikasyon an.");
  }

  hideLoader();
};

// ---------------------------------------------
// LOAD NOTIFICATION HISTORY
// ---------------------------------------------
const q = query(
  collection(db, "notifications"),
  orderBy("timestamp", "desc")
);

onSnapshot(q, (snapshot) => {
  notifList.innerHTML = "";

  if (snapshot.empty) {
    notifList.innerHTML = `<div class="item-card">Pa gen notifikasyon pou kounya.</div>`;
    return;
  }

  snapshot.forEach((doc) => {
    const data = doc.data();

    const item = document.createElement("div");
    item.className = "item-card";

    const time = data.timestamp?.toDate
      ? data.timestamp.toDate().toLocaleString()
      : "—";

    item.innerHTML = `
      <div style="font-weight:600;">${data.title}</div>
      <div style="font-size:13px; margin-top:4px;">${data.message}</div>
      <div style="font-size:12px; color:#bbb; margin-top:6px;">
        Pou: ${data.target}
      </div>
      <div style="font-size:12px; color:#888;">
        ${data.sender} – ${time}
      </div>
    `;

    notifList.appendChild(item);
  });
});
