// =============================================
// AUTOMATION ENGINE PRO‑MAX
// - Scheduled tasks
// - Auto actions
// - Background engine
// =============================================

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { showLoader, hideLoader } from "./ui-ux-pro-max-final.js";

const db = getFirestore();

// DOM
const taskType = document.getElementById("taskType");
const taskInterval = document.getElementById("taskInterval");
const createTaskBtn = document.getElementById("createTaskBtn");
const taskList = document.getElementById("taskList");

// ---------------------------------------------
// CREATE TASK
// ---------------------------------------------
createTaskBtn.onclick = async () => {
  const type = taskType.value;
  const interval = parseInt(taskInterval.value);

  showLoader();

  try {
    await addDoc(collection(db, "automation_tasks"), {
      type,
      interval,
      lastRun: null,
      timestamp: serverTimestamp()
    });

    alert("Task kreye avèk siksè.");

  } catch (err) {
    console.error(err);
    alert("Erè pandan kreye task la.");
  }

  hideLoader();
};

// ---------------------------------------------
// LIST TASKS
// ---------------------------------------------
const q = query(
  collection(db, "automation_tasks"),
  orderBy("timestamp", "desc")
);

onSnapshot(q, (snapshot) => {
  taskList.innerHTML = "";

  if (snapshot.empty) {
    taskList.innerHTML = `<div class="item-card">Pa gen tasks pou kounya.</div>`;
    return;
  }

  snapshot.forEach((docItem) => {
    const data = docItem.data();

    const item = document.createElement("div");
    item.className = "item-card";

    const lastRun = data.lastRun?.toDate
      ? data.lastRun.toDate().toLocaleString()
      : "Jamè";

    item.innerHTML = `
      <div style="font-weight:600;">${data.type}</div>
      <div style="font-size:13px;">Entèval: ${data.interval} min</div>
      <div style="font-size:13px;">Dènye Egzekisyon: ${lastRun}</div>

      <button class="btn-danger" data-id="${docItem.id}" style="margin-top:8px;">
        Efase Task
      </button>
    `;

    taskList.appendChild(item);
  });

  // Delete task
  document.querySelectorAll(".btn-danger").forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      await deleteDoc(doc(db, "automation_tasks", id));
    };
  });
});
