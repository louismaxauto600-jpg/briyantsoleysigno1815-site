import { auth, db, storage } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

export async function loginAdmin() {
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (!email || !password) {
    alert("Tanpri antre imel ak modpas admin.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("adminSection").classList.remove("hidden");
    document.getElementById("logoutBtn").classList.remove("hidden");

    loadMusicians();
  } catch (error) {
    alert("Login echwe: " + error.message);
  }
}

export async function logoutAdmin() {
  await signOut(auth);

  document.getElementById("loginSection").classList.remove("hidden");
  document.getElementById("adminSection").classList.add("hidden");
  document.getElementById("logoutBtn").classList.add("hidden");
}

export async function addMusician() {
  const name = document.getElementById("musicianName").value.trim();
  const role = document.getElementById("musicianRole").value.trim();
  const photoFile = document.getElementById("musicianPhoto").files[0];

  if (!name || !role || !photoFile) {
    alert("Ranpli tout chan yo.");
    return;
  }

  try {
    const storageRef = ref(storage, "musicians/" + Date.now() + "_" + photoFile.name);
    await uploadBytes(storageRef, photoFile);
    const photoURL = await getDownloadURL(storageRef);

    await addDoc(collection(db, "musicians"), {
      name,
      role,
      photoURL,
      storagePath: storageRef.fullPath
    });

    alert("Mizisyen an ajoute avèk siksè!");

    document.getElementById("musicianName").value = "";
    document.getElementById("musicianRole").value = "";
    document.getElementById("musicianPhoto").value = "";

    loadMusicians();
  } catch (error) {
    alert("Erè pandan anrejistreman: " + error.message);
  }
}

async function loadMusicians() {
  const listDiv = document.getElementById("musicianList");
  listDiv.innerHTML = "<p>Chaje mizisyen yo...</p>";

  const querySnapshot = await getDocs(collection(db, "musicians"));

  let html = "";
  querySnapshot.forEach((docItem) => {
    const data = docItem.data();

    html += `
      <div class="card">
        <img src="${data.photoURL}">
        <h3>${data.name}</h3>
        <p>${data.role}</p>
        <button onclick="deleteMusician('${docItem.id}', '${data.storagePath}')">Efase</button>
      </div>
    `;
  });

  listDiv.innerHTML = html;
}

export async function deleteMusician(id, storagePath) {
  if (!confirm("Ou vle efase mizisyen sa a?")) return;

  try {
    const photoRef = ref(storage, storagePath);
    await deleteObject(photoRef);

    await deleteDoc(doc(db, "musicians", id));

    alert("Mizisyen efase avèk siksè.");
    loadMusicians();
  } catch (error) {
    alert("Erè pandan efasman: " + error.message);
  }
}

window.loginAdmin = loginAdmin;
window.logoutAdmin = logoutAdmin;
window.addMusician = addMusician;
window.deleteMusician = deleteMusician;
