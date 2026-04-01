rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {

    // ADMIN-ONLY ACCESS
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
  }// admin.js — BSS 1815 OFFICIAL ADMIN PANEL
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


// -----------------------------
// ADMIN LOGIN
// -----------------------------
export async function loginAdmin() {
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (!email || !password) {
    alert("Antre imel ak modpas admin.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    document.getElementById("loginSection").style.display = "none";
    document.getElementById("adminSection").style.display = "block";

    loadMusicians();
  } catch (error) {
    alert("Login echwe: " + error.message);
  }
}


// -----------------------------
// LOGOUT
// -----------------------------
export async function logoutAdmin() {
  await signOut(auth);
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("adminSection").style.display = "none";
}


// -----------------------------
// ADD MUSICIAN
// -----------------------------
export async function addMusician() {
  const name = document.getElementById("musicianName").value.trim();
  const role = document.getElementById("musicianRole").value.trim();
  const photoFile = document.getElementById("musicianPhoto").files[0];

  if (!name || !role || !photoFile) {
    alert("Ranpli tout chan yo.");
    return;
  }

  try {
    // Upload photo
    const storageRef = ref(storage, "musicians/" + Date.now() + "_" + photoFile.name);
    await uploadBytes(storageRef, photoFile);
    const photoURL = await getDownloadURL(storageRef);

    // Save Firestore document
    await addDoc(collection(db, "musicians"), {
      name,
      role,
      photoURL,
      storagePath: storageRef.fullPath
    });

    alert("Mizisyen an ajoute!");
    document.getElementById("musicianName").value = "";
    document.getElementById("musicianRole").value = "";
    document.getElementById("musicianPhoto").value = "";

    loadMusicians();
  } catch (error) {
    alert("Erè pandan anrejistreman: " + error.message);
  }
}


// -----------------------------
// LOAD MUSICIAN LIST
// -----------------------------
async function loadMusicians() {
  const listDiv = document.getElementById("musicianList");
  listDiv.innerHTML = "<p>Chaje mizisyen yo...</p>";

  const querySnapshot = await getDocs(collection(db, "musicians"));

  let html = "";
  querySnapshot.forEach((docItem) => {
    const data = docItem.data();

    html += `
      <div class="card" style="margin-top:15px;">
        <img src="${data.photoURL}" style="width:100%; border-radius:8px;">
        <h3>${data.name}</h3>
        <p>${data.role}</p>
        <button onclick="deleteMusician('${docItem.id}', '${data.storagePath}')">Efase</button>
      </div>
    `;
  });

  listDiv.innerHTML = html;
}


// -----------------------------
// DELETE MUSICIAN
// -----------------------------
export async function deleteMusician(id, storagePath) {
  if (!confirm("Ou vle efase mizisyen sa a?")) return;

  try {
    // Delete photo from storage
    const photoRef = ref(storage, storagePath);
    await deleteObject(photoRef);

    // Delete Firestore document
    await deleteDoc(doc(db, "musicians", id));

    alert("Mizisyen efase.");
    loadMusicians();
  } catch (error) {
    alert("Erè pandan efasman: " + error.message);
  }
}


// -----------------------------
// MAKE FUNCTIONS GLOBAL FOR HTML
// -----------------------------
window.loginAdmin = loginAdmin;
window.logoutAdmin = logoutAdmin;
window.addMusician = addMusician;
window.deleteMusician = deleteMusician;
