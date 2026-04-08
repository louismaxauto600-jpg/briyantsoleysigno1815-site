// =====================================
//  VIDEOS ENGINE PRO‑MAX (FINAL)
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
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

let CURRENT_ROLE = null;

// =====================================
//  CHECK USER + ROLE
// =====================================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const token = await user.getIdTokenResult();
  CURRENT_ROLE = token.claims.role || "admin";

  document.getElementById("roleChip").textContent = CURRENT_ROLE.toUpperCase();

  await loadVideos();
});

// =====================================
//  LOAD VIDEOS PRO‑MAX
// =====================================
async function loadVideos() {
  const list = document.getElementById("videosList");
  list.innerHTML = "";

  const snap = await getDocs(collection(db, "videos"));

  snap.forEach((docu) => {
    const v = docu.data();

    list.innerHTML += `
      <div class="video-card">
        <video src="${v.url}" controls></video>
        <h3>${v.title}</h3>
        <small>${new Date(v.createdAt).toLocaleString()}</small>
        <button class="delete-btn" onclick="deleteVideo('${docu.id}', '${v.storagePath}')">Efase</button>
      </div>
    `;
  });
}

// =====================================
//  UPLOAD VIDEO PRO‑MAX
// =====================================
document.getElementById("uploadVideoBtn").onclick = async () => {
  const title = document.getElementById("v-title").value.trim();
  const fileInput = document.getElementById("v-file");
  const file = fileInput.files[0];

  if (!title || !file) return;

  try {
    const path = `videos/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "videos"), {
      title,
      url,
      storagePath: path,
      createdAt: Date.now()
    });

    document.getElementById("v-title").value = "";
    fileInput.value = "";

    await loadVideos();
    alert("Videyo PRO‑MAX telechaje ak siksè.");
  } catch (err) {
    alert("Erè: " + err.message);
  }
};

// =====================================
//  DELETE VIDEO PRO‑MAX
// =====================================
window.deleteVideo = async (id, storagePath) => {
  if (!confirm("Ou vle efase videyo sa a?")) return;

  try {
    await deleteDoc(doc(db, "videos", id));

    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);

    await loadVideos();
  } catch (err) {
    alert("Erè: " + err.message);
  }
};
