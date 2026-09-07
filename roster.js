// js/roster.js — paj jenerik pou Musicians ak Leaders
// Itilize ?type=musicians oswa ?type=leaders nan URL la

import { auth, db, storage } from "./firebase.js";
import { getUserRole } from "./firebase-roles.js";
import { isCommitteeMember, isAdvisor } from "./disciplinary-roles.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection, addDoc, getDocs, query, orderBy, doc, deleteDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL, deleteObject
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const TYPES = {
  musicians: { label: "Mizisyen", collection: "musicians", storagePrefix: "musicians" },
  leaders: { label: "Dirijan", collection: "leaders", storagePrefix: "leaders" }
};

// Lis ofisyèl enstriman yo — orijinal ou yo + rechèch Rara Léogâne
const INSTRUMENT_GROUPS = {
  "Enstriman BSS": ["Gwaj", "Echap", "Asyèt", "Bass", "Charlemagne"],
  "Tradisyonèl Rara": [
    "Banbou (Vaksin)", "Banbou Bas", "Banbou Charlemagne", "Kònè / Klewon",
    "Tanbou Manman", "Tanbou Bas", "Kata", "Kès", "Tchatcha / Maraka",
    "Graj / Gita", "Kloch / Ogan", "Senbal"
  ],
  "Fanfa Modèn": [
    "Twonpèt", "Twonbòn", "Saksofòn Alto", "Saksofòn Tenò",
    "Gwo Kès Fanfa", "Ti Kès (Snare)", "Sousafòn / Tuba"
  ]
};

const params = new URLSearchParams(window.location.search);
const typeKey = TYPES[params.get("type")] ? params.get("type") : "musicians";
const config = TYPES[typeKey];

document.getElementById("pageTitle").textContent = `BSS 1815 · ${config.label.toUpperCase()}`;
document.getElementById("sectionTitle").textContent = config.label;
document.title = `${config.label} — PRO-MAX DMP`;

let currentUser = null;
let currentRole = null;
let onCommittee = false;
let onAdvisory = false;
let currentProfileName = null;
let allRosterItems = [];   // tout done ki chaje yo, pou filtre san re-fetch
let activeFilter = "Tout"; // enstriman/wòl aktyèlman seleksyone

onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "login.html"; return; }
  currentUser = user;

  currentRole = await getUserRole(user.uid);
  onCommittee = await isCommitteeMember(user.uid);
  onAdvisory = await isAdvisor(user.uid);

  if (currentRole === "NONE" && !onCommittee && !onAdvisory) {
    await signOut(auth);
    window.location.href = "login.html";
    return;
  }

  currentProfileName = user.email;
  init();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "login.html");
});

function isAdminOrSuper() {
  return currentRole === "SUPER_ADMIN" || currentRole === "ADMIN";
}

function init() {
  document.getElementById("whoName").textContent = currentProfileName;
  const badge = document.getElementById("roleBadge");
  badge.textContent = currentRole === "SUPER_ADMIN" ? "SUPER ADMIN" : (currentRole === "ADMIN" ? "ADMIN" : "MANM");
  badge.classList.add(currentRole === "SUPER_ADMIN" ? "super" : "admin");

  if (isAdminOrSuper()) {
    document.getElementById("addPanel").classList.remove("hidden");
  }

  setupRoleField();
  loadRoster();
}

function setupRoleField() {
  if (typeKey !== "musicians") return; // Dirijan yo rete ak chan tèks lib

  const wrap = document.getElementById("roleFieldWrap");
  const optgroups = Object.entries(INSTRUMENT_GROUPS).map(([groupName, items]) => `
    <optgroup label="${groupName}">
      ${items.map(i => `<option value="${i}">${i}</option>`).join("")}
    </optgroup>
  `).join("");

  wrap.innerHTML = `
    <label>Enstriman</label>
    <select id="newRoleTitle">
      ${optgroups}
      <option value="__other__">Lòt (tape manyèlman)</option>
    </select>
    <input type="text" id="newRoleTitleOther" placeholder="Non enstriman an" class="hidden" style="margin-top:8px;">
  `;

  document.getElementById("newRoleTitle").addEventListener("change", (e) => {
    document.getElementById("newRoleTitleOther").classList.toggle("hidden", e.target.value !== "__other__");
  });
}

function getRoleTitleValue() {
  const select = document.getElementById("newRoleTitle");
  if (typeKey === "musicians" && select.value === "__other__") {
    return document.getElementById("newRoleTitleOther").value.trim();
  }
  return select.value.trim();
}

document.getElementById("addBtn").addEventListener("click", async () => {
  const name = document.getElementById("newName").value.trim();
  const roleTitle = getRoleTitleValue();
  const phone = document.getElementById("newPhone").value.trim();
  const photoFile = document.getElementById("newPhoto").files[0];
  const statusEl = document.getElementById("addStatus");

  if (!name) { alert("Antre non moun nan."); return; }

  statusEl.textContent = "Ap ajoute...";

  try {
    let photoUrl = null;
    if (photoFile) {
      const safeName = Date.now() + "-" + photoFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const storageRef = ref(storage, `${config.storagePrefix}/${safeName}`);
      await uploadBytes(storageRef, photoFile);
      photoUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, config.collection), {
      name,
      roleTitle: roleTitle || "",
      phone: phone || "",
      photoUrl,
      addedBy: currentUser.uid,
      addedAt: serverTimestamp()
    });

    document.getElementById("newName").value = "";
    if (typeKey === "musicians") {
      document.getElementById("newRoleTitle").value = INSTRUMENTS[0];
      document.getElementById("newRoleTitleOther").value = "";
      document.getElementById("newRoleTitleOther").classList.add("hidden");
    } else {
      document.getElementById("newRoleTitle").value = "";
    }
    document.getElementById("newPhone").value = "";
    document.getElementById("newPhoto").value = "";
    statusEl.textContent = "Ajoute avèk siksè.";
    loadRoster();
  } catch (err) {
    statusEl.textContent = "Erè: " + err.message;
  }
});

async function loadRoster() {
  const grid = document.getElementById("rosterGrid");
  grid.innerHTML = "<p style='color:var(--text-dim);'>Ap chaje...</p>";

  const snap = await getDocs(query(collection(db, config.collection), orderBy("name")));
  allRosterItems = [];
  snap.forEach((docSnap) => {
    allRosterItems.push({ id: docSnap.id, ...docSnap.data() });
  });

  renderFilterBar();
  renderGrid();
}

function renderFilterBar() {
  const bar = document.getElementById("filterBar");
  bar.innerHTML = "";

  if (allRosterItems.length === 0) return;

  // Pran chak valè distenk nan roleTitle (enstriman/wòl), san sansib a gwosè lèt
  const seen = new Map(); // key: miniskil, value: fòm afiche a
  allRosterItems.forEach((item) => {
    const raw = (item.roleTitle || "").trim();
    if (!raw) return;
    const key = raw.toLowerCase();
    if (!seen.has(key)) seen.set(key, raw);
  });

  const options = ["Tout", ...Array.from(seen.values()).sort()];

  options.forEach((label) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (label === activeFilter ? " active" : "");
    btn.textContent = label;
    btn.addEventListener("click", () => {
      activeFilter = label;
      renderFilterBar();
      renderGrid();
    });
    bar.appendChild(btn);
  });
}

function renderGrid() {
  const grid = document.getElementById("rosterGrid");

  const filtered = activeFilter === "Tout"
    ? allRosterItems
    : allRosterItems.filter(item => (item.roleTitle || "").trim().toLowerCase() === activeFilter.toLowerCase());

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-dim);">Pa gen ${config.label.toLowerCase()} pou "${activeFilter}".</p>`;
    return;
  }

  grid.innerHTML = "";
  filtered.forEach((d) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      ${d.photoUrl ? `<img src="${d.photoUrl}" class="roster-photo" alt="${d.name}">` : ""}
      <h3>${d.name}</h3>
      <p>${d.roleTitle || "—"}</p>
      ${d.phone ? `<p>${d.phone}</p>` : ""}
      ${isAdminOrSuper() ? `<button class="btn-danger" style="margin-top:10px;" data-id="${d.id}">Retire</button>` : ""}
    `;
    if (isAdminOrSuper()) {
      card.querySelector("button").addEventListener("click", async (e) => {
        e.stopPropagation();
        if (!confirm(`Retire ${d.name} nan rostè a?`)) return;
        if (d.photoUrl) {
          try {
            const path = decodeURIComponent(d.photoUrl.split("/o/")[1].split("?")[0]);
            await deleteObject(ref(storage, path));
          } catch (err) { /* foto a ka deja efase, kontinye */ }
        }
        await deleteDoc(doc(db, config.collection, d.id));
        loadRoster();
      });
    }
    grid.appendChild(card);
  });
}

