// =============================================
// MEDIA MANAGER PRO‑MAX
// - Upload imaj/videyo
// - Lis tout media
// - Delete media
// =============================================

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { showLoader, hideLoader } from "./ui-ux-pro-max-final.js";

const storage = getStorage();
const db = getFirestore();

// DOM
const mediaFile = document.getElementById("mediaFile");
const uploadBtn = document.getElementById("uploadBtn");
const mediaList = document.getElementById("mediaList");

// ---------------------------------------------
// UPLOAD MEDIA
// ---------------------------------------------
uploadBtn.onclick = async () => {
  const file = mediaFile.files[0];
  if (!file) return alert("Chwazi yon fichye.");

  showLoader();

  try {
    const id = crypto.randomUUID();
    const storageRef = ref(storage, `media/${id}-${file.name}`);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await setDoc(doc(db, "media", id), {
      url,
      name: file.name,
      type: file.type,
      timestamp: new Date()
    });

    alert("Upload fèt avèk siksè.");
    loadMedia();

  } catch (err) {
    console.error(err);
    alert("Erè pandan upload la.");
  }

  hideLoader();
};

// ---------------------------------------------
// LOAD MEDIA
// ---------------------------------------------
async function loadMedia() {
  mediaList.innerHTML = "";
  showLoader();

  const snap = await getDocs(collection(db, "media"));

  if (snap.empty) {
    mediaList.innerHTML = `<div class="item-card">Pa gen media pou kounya.</div>`;
    hideLoader();
    return;
  }

  snap.forEach((docItem) => {
    const data = docItem.data();

    const card = document.createElement("div");
    card.className = "card";

    const isImage = data.type.startsWith("image/");
    const isVideo = data.type.startsWith("video/");

    card.innerHTML = `
      <div style="margin-bottom:10px;">
        ${isImage ? `<img src="${data.url}" style="width:100%; border-radius:8px;" />` : ""}
        ${isVideo ? `<video src="${data.url}" controls style="width:100%; border-radius:8px;"></video>` : ""}
      </div>

      <div style="font-size:12px; margin-bottom:8px;">${data.name}</div>

      <button class="btn-danger" data-id="${docItem.id}" data-url="${data.url}">
        Efase
      </button>
    `;

    mediaList.appendChild(card);
  });

  hideLoader();

  // Attach delete events
  document.querySelectorAll(".btn-danger").forEach((btn) => {
    btn.onclick = () => deleteMedia(btn.dataset.id, btn.dataset.url);
  });
}

// ---------------------------------------------
// DELETE MEDIA
// ---------------------------------------------
async function deleteMedia(id, url) {
  if (!confirm("Ou vle efase fichye sa?")) return;

  showLoader();

  try {
    // Delete from storage
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);

    // Delete from Firestore
    await deleteDoc(doc(db, "media", id));

    alert("Media efase.");
    loadMedia();

  } catch (err) {
    console.error(err);
    alert("Erè pandan efasman.");
  }

  hideLoader();
}

// INIT
loadMedia();
