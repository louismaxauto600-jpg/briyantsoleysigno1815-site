// ===============================
//  MUSICIAN ENGINE PRO‑MAX (FINAL)
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

let musiciansCache = [];

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

  await loadMusicians();
  attachFilters();
});

// ===============================
//  LOAD MUSICIANS PRO‑MAX
// ===============================
async function loadMusicians() {
  const list = document.getElementById("musiciansList");
  list.innerHTML = "";

  const snap = await getDocs(collection(db, "musicians"));
  musiciansCache = [];

  snap.forEach((docu) => {
    const data = { id: docu.id, ...docu.data() };
    musiciansCache.push(data);
  });

  renderMusicians(musiciansCache);
}

function renderMusicians(dataArr) {
  const list = document.getElementById("musiciansList");
  list.innerHTML = "";

  dataArr.forEach((m) => {
    list.innerHTML += `
      <div class="card">
        <h3>${m.name}</h3>
        <span>${m.instrument || ""}</span>
        <small>${m.section || ""}</small>
        ${m.photoURL ? `<img src="${m.photoURL}" alt="${m.name}">` : ""}
        <button class="delete-btn" onclick="deleteMusician('${m.id}')">Efase</button>
      </div>
    `;
  });
}

// ===============================
//  ADD MUSICIAN PRO‑MAX
// ===============================
document.getElementById("addMusicianBtn").onclick = async () => {
  const name = document.getElementById("m-name").value.trim();
  const instrument = document.getElementById("m-instrument").value.trim();
  const section = document.getElementById("m-section").value.trim();
  const fileInput = document.getElementById("m-photo");
  const file = fileInput.files[0];

  if (!name) return;

  let photoURL = "";

  try {
    if (file) {
      const path = `musicians/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "musicians"), {
      name,
      instrument,
      section,
      photoURL,
      createdAt: Date.now()
    });

    document.getElementById("m-name").value = "";
    document.getElementById("m-instrument").value = "";
    document.getElementById("m-section").value = "";
    fileInput.value = "";

    await loadMusicians();
    alert("Mizisyen PRO‑MAX ajoute ak siksè.");
  } catch (err) {
    alert("Erè: " + err.message);
  }
};

// ===============================
//  DELETE MUSICIAN PRO‑MAX
// ===============================
window.deleteMusician = async (id) => {
  if (!confirm("Ou vle efase mizisyen sa a?")) return;

  await deleteDoc(doc(db, "musicians", id));
  await loadMusicians();
};

// ===============================
//  FILTERS PRO‑MAX
// ===============================
function attachFilters() {
  const searchName = document.getElementById("searchName");
  const searchInstrument = document.getElementById("searchInstrument");
  const searchSection = document.getElementById("searchSection");

  const applyFilter = () => {
    const n = (searchName.value || "").toLowerCase();
    const i = (searchInstrument.value || "").toLowerCase();
    const s = (searchSection.value || "").toLowerCase();

    const filtered = musiciansCache.filter((m) => {
      const matchName = m.name?.toLowerCase().includes(n);
      const matchInstr = (m.instrument || "").toLowerCase().includes(i);
      const matchSec = (m.section || "").toLowerCase().includes(s);
      return matchName && matchInstr && matchSec;
    });

    renderMusicians(filtered);
  };

  searchName.addEventListener("input", applyFilter);
  searchInstrument.addEventListener("input", applyFilter);
  searchSection.addEventListener("input", applyFilter);
}
