/* BSS1815 — ADMIN.JS (LOCAL MODE) */

if (!localStorage.getItem("bss-admins")) {
  localStorage.setItem("bss-admins", JSON.stringify([
    { name: "Super Admin", role: "SUPER ADMIN" }
  ]));
}

if (!localStorage.getItem("bss-musicians")) {
  localStorage.setItem("bss-musicians", JSON.stringify([]));
}

if (!localStorage.getItem("bss-leaders")) {
  localStorage.setItem("bss-leaders", JSON.stringify([]));
}

const roleChip = document.getElementById("roleChip");
const settingsRole = document.getElementById("settingsRole");
const superBadge = document.getElementById("superAdminBadge");
const adminBadge = document.getElementById("adminBadge");

let currentRole = "SUPER ADMIN";
roleChip.textContent = currentRole;
settingsRole.textContent = currentRole;

if (currentRole === "SUPER ADMIN") {
  superBadge.style.display = "block";
  adminBadge.style.display = "none";
} else {
  superBadge.style.display = "none";
  adminBadge.style.display = "block";
}

const totalAdmins = document.getElementById("totalAdmins");

function loadDashboard() {
  const admins = JSON.parse(localStorage.getItem("bss-admins"));
  totalAdmins.textContent = admins.length;
}
loadDashboard();

const adminsList = document.getElementById("adminsList");

function loadAdmins() {
  const admins = JSON.parse(localStorage.getItem("bss-admins"));
  adminsList.innerHTML = "";
  admins.forEach(admin => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${admin.name}</h3>
      <span>${admin.role}</span>
    `;
    adminsList.appendChild(card);
  });
}
loadAdmins();

const musiciansList = document.getElementById("musiciansList");
const addMusicianBtn = document.getElementById("addMusicianBtn");

addMusicianBtn.addEventListener("click", () => {
  const name = document.getElementById("m-name").value.trim();
  const instrument = document.getElementById("m-instrument").value.trim();
  const section = document.getElementById("m-section").value.trim();
  const photo = document.getElementById("m-photo").files[0];

  if (!name || !instrument || !section) {
    alert("Ranpli tout chan yo.");
    return;
  }

  const musicians = JSON.parse(localStorage.getItem("bss-musicians"));
  musicians.push({
    name,
    instrument,
    section,
    photoName: photo ? photo.name : null
  });
  localStorage.setItem("bss-musicians", JSON.stringify(musicians));

  document.getElementById("m-name").value = "";
  document.getElementById("m-instrument").value = "";
  document.getElementById("m-section").value = "";
  document.getElementById("m-photo").value = "";

  loadMusicians();
});

function loadMusicians() {
  const musicians = JSON.parse(localStorage.getItem("bss-musicians"));
  musiciansList.innerHTML = "";
  musicians.forEach(m => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${m.name}</h3>
      <span>${m.instrument}</span>
      <small>${m.section}</small>
    `;
    musiciansList.appendChild(card);
  });
}
loadMusicians();

const leadersList = document.getElementById("leadersList");
const addLeaderBtn = document.getElementById("addLeaderBtn");

addLeaderBtn.addEventListener("click", () => {
  const name = document.getElementById("l-name").value.trim();
  const role = document.getElementById("l-role").value.trim();
  const photo = document.getElementById("l-photo").files[0];

  if (!name || !role) {
    alert("Ranpli tout chan yo.");
    return;
  }

  const leaders = JSON.parse(localStorage.getItem("bss-leaders"));
  leaders.push({
    name,
    role,
    photoName: photo ? photo.name : null
  });
  localStorage.setItem("bss-leaders", JSON.stringify(leaders));

  document.getElementById("l-name").value = "";
  document.getElementById("l-role").value = "";
  document.getElementById("l-photo").value = "";

  loadLeaders();
});

function loadLeaders() {
  const leaders = JSON.parse(localStorage.getItem("bss-leaders"));
  leadersList.innerHTML = "";
  leaders.forEach(l => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${l.name}</h3>
      <span>${l.role}</span>
    `;
    leadersList.appendChild(card);
  });
}
loadLeaders();

document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("Ou dekonekte.");
  window.location.href = "index.html";
});
