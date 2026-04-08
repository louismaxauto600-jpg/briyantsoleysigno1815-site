// ===============================
//  BRANDING PRO‑MAX (FINAL)
// ===============================

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
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

const BRAND_DOC = doc(db, "branding", "global");

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

  await loadBranding();
  attachLivePreview();
});

// ===============================
//  LOAD BRANDING PRO‑MAX
// ===============================
async function loadBranding() {
  const snap = await getDoc(BRAND_DOC);

  if (!snap.exists()) return;

  const data = snap.data();

  const nameInput = document.getElementById("brandName");
  const sloganInput = document.getElementById("brandSlogan");
  const previewName = document.getElementById("previewName");
  const previewSlogan = document.getElementById("previewSlogan");
  const previewLogo = document.getElementById("previewLogo");

  if (data.name) {
    nameInput.value = data.name;
    previewName.textContent = data.name;
  }

  if (data.slogan) {
    sloganInput.value = data.slogan;
    previewSlogan.textContent = data.slogan;
  }

  if (data.logoURL) {
    previewLogo.src = data.logoURL;
  }
}

// ===============================
//  LIVE PREVIEW PRO‑MAX
// ===============================
function attachLivePreview() {
  const nameInput = document.getElementById("brandName");
  const sloganInput = document.getElementById("brandSlogan");
  const previewName = document.getElementById("previewName");
  const previewSlogan = document.getElementById("previewSlogan");

  nameInput.addEventListener("input", () => {
    previewName.textContent = nameInput.value || "BSS1815";
  });

  sloganInput.addEventListener("input", () => {
    previewSlogan.textContent = sloganInput.value || "Slogan BSS1815 ap parèt isit la…";
  });

  document.getElementById("saveBrandBtn").onclick = saveBranding;
}

// ===============================
//  SAVE BRANDING PRO‑MAX
// ===============================
async function saveBranding() {
  const nameInput = document.getElementById("brandName");
  const sloganInput = document.getElementById("brandSlogan");
  const logoInput = document.getElementById("brandLogo");
  const previewLogo = document.getElementById("previewLogo");

  const name = nameInput.value.trim();
  const slogan = sloganInput.value.trim();
  const file = logoInput.files[0];

  let logoURL = previewLogo.src || "";

  try {
    if (file) {
      const path = `branding/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      logoURL = await getDownloadURL(storageRef);
      previewLogo.src = logoURL;
    }

    await setDoc(BRAND_DOC, {
      name,
      slogan,
      logoURL,
      updatedAt: Date.now()
    }, { merge: true });

    alert("Branding PRO‑MAX mete ajou ak siksè.");
  } catch (err) {
    alert("Erè: " + err.message);
  }
}
