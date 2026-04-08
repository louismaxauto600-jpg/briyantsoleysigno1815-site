// ===============================
//  LEADER ENGINE PRO‑MAX (FINAL)
// ===============================

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

let leadersCache = [];

// ===============================
//  CHECK USER + ROLE
// ===============================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const token = await user.getIdTokenResult();
  const role = token.claims.role || "admin";

  document.getElementById("roleChip").textContent = role.toUpperCase();

  await loadLeaders();
  attachFilters();
});

// ===============================
//  LOAD LEADERS PRO‑MAX
// ===============================
async function loadLeaders() {
  const list = document.getElementById("leadersList");
  list.innerHTML = "";

  const snap = await getDocs(collection(db, "leaders"));
  leadersCache = [];

  snap.forEach((docu) => {
    const data = { id: docu.id, ...docu.data() };
    leadersCache.push(data);
  });

  renderLeaders(leadersCache);
}

function renderLeaders(dataArr) {
  const list = document.getElementById("leadersList");
  list.innerHTML = "";

  dataArr.forEach((l) => {
    list.innerHTML += `
      <div class="card">
        <h3>${l.name}</h3>
        <span>${l.role}</span>
        ${l.photoURL ? `<img src="${l.photoURL}" alt="${l.name}">` : ""}
        <button class="delete-btn" onclick="deleteLeader('${l.id}')">Efase</button>
      </div>
    `;
  });
}

// ===============================
//  ADD LEADER PRO‑MAX
// ===============================
document.getElementById("addLeaderBtn").onclick = async () => {
  const name = document.getElementById("l-name").value.trim();
  const role = document.getElementById("l-role").value.trim();
  const fileInput = document.getElementById("l-photo");
  const file = fileInput.files[0];

  if (!name || !role) return;

  let photoURL = "";

  try {
    if (file) {
      const path = `leaders/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "leaders"), {
      name,
      role,
      photoURL,
      createdAt: Date.now()
    });

    document.getElementById("l-name").value = "";
    document.getElementById("l-role").value = "";
    fileInput.value = "";

    await loadLeaders();
    alert("Lidè PRO‑MAX ajoute ak siksè.");
  } catch (err) {
    alert("Erè: " + err.message);
  }
};

// ===============================
//  DELETE LEADER PRO‑MAX
// ===============================
window.deleteLeader = async (id) => {
  if (!confirm("Ou vle efase lidè sa a?")) return;

  await deleteDoc(doc(db, "leaders", id));
  await loadLeaders();
};

// ===============================
//  FILTERS PRO‑MAX
// ===============================
function attachFilters() {
  const searchName = document.getElementById("searchName");
  const searchRole = document.getElementById("searchRole");

  const applyFilter = () => {
    const n = (searchName.value || "").toLowerCase();
    const r = (searchRole.value || "").toLowerCase();

    const filtered = leadersCache.filter((l) => {
      const matchName = l.name?.toLowerCase().includes(n);
      const matchRole = l.role?.toLowerCase().includes(r);
      return matchName && matchRole;
    });

    renderLeaders(filtered);
  };

  searchName.addEventListener("input", applyFilter);
  searchRole.addEventListener("input", applyFilter);
}
