// ------------------------------
// BSS1815 — SUPER ADMIN ENGINE
// admin-system.js (CLEAN PRO‑MAX)
// ------------------------------

// MOCK DATA (vizyèl sèlman)
let admins = [
  { name: "MAX", email: "max@bss1815.com", role: "SUPER_ADMIN", status: "ACTIVE" },
  { name: "CANGE", email: "cange@bss1815.com", role: "SUPER_ADMIN", status: "ACTIVE" }
];

let logs = [
  {
    actor: "MAX",
    action: "SUPER ADMIN LOGIN",
    type: "SECURITY",
    time: "Kounya",
    detail: "MAX ouvri SUPER ADMIN DASHBOARD BSS1815."
  }
];

// ------------------------------
// HELPERS
// ------------------------------

function addLog(actor, action, type, detail) {
  logs.unshift({
    actor,
    action,
    type,
    time: "Kounya",
    detail
  });
  renderLogs();
  renderOverviewLog();
  updateLastAction(action);
}

function updateAdminCount() {
  document.getElementById("card-admin-count").textContent = admins.length;
}

function updateLastAccess() {
  const now = new Date();
  const formatted = now.toLocaleDateString() + " — " + now.toLocaleTimeString();
  document.getElementById("card-last-access").textContent = formatted;
}

function updateLastAction(action) {
  document.getElementById("card-last-action").textContent = action;
}

// ------------------------------
// RENDER ADMIN TABLE
// ------------------------------

function renderAdminTable() {
  const tbody = document.querySelector("#admin-table tbody");
  tbody.innerHTML = "";

  admins.forEach((admin, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${admin.name}</td>
      <td>${admin.email}</td>
      <td><span class="${admin.role === "SUPER_ADMIN" ? "pill-role" : "pill-admin"}">${admin.role}</span></td>
      <td>
        <span class="${admin.status === "ACTIVE" ? "pill-status-ok" : "pill-status-fail"}">
          <span class="pill-dot"></span>${admin.status}
        </span>
      </td>
      <td>
        <button class="btn-xs" data-action="lock">${admin.status === "ACTIVE" ? "LOCK" : "UNLOCK"}</button>
        <button class="btn-xs danger" data-action="remove">REMOVE</button>
      </td>
    `;

    // ACTIONS
    tr.querySelector('[data-action="lock"]').addEventListener("click", () => {
      admin.status = admin.status === "ACTIVE" ? "LOCKED" : "ACTIVE";
      addLog("MAX", admin.status === "ACTIVE" ? "UNLOCK ADMIN" : "LOCK ADMIN", "SECURITY", `Chanjman estati pou ${admin.name}.`);
      renderAdminTable();
    });

    tr.querySelector('[data-action="remove"]').addEventListener("click", () => {
      if (confirm(`Retire ${admin.name} nan lis admin yo?`)) {
        admins.splice(index, 1);
        addLog("MAX", "REMOVE ADMIN", "SYSTEM", `Admin retire: ${admin.name}.`);
        renderAdminTable();
        updateAdminCount();
      }
    });

    tbody.appendChild(tr);
  });
}

// ------------------------------
// RENDER LOGS
// ------------------------------

function renderLogs() {
  const container = document.getElementById("logs-list");
  container.innerHTML = "";

  logs.forEach(log => {
    const item = document.createElement("div");
    item.className = "log-item";

    item.innerHTML = `
      <div class="log-main">
        <div><span class="log-actor">${log.actor}</span> — ${log.action}</div>
        <div class="log-meta">${log.time}</div>
      </div>
      <div class="log-meta">${log.detail}</div>
      <div class="log-tag">${log.type}</div>
    `;

    container.appendChild(item);
  });
}

function renderOverviewLog() {
  const container = document.getElementById("overview-log");
  container.innerHTML = "";

  logs.slice(0, 4).forEach(log => {
    const item = document.createElement("div");
    item.className = "log-item";

    item.innerHTML = `
      <div class="log-main">
        <div><span class="log-actor">${log.actor}</span> — ${log.action}</div>
        <div class="log-meta">${log.time}</div>
      </div>
      <div class="log-meta">${log.detail}</div>
    `;

    container.appendChild(item);
  });
}

// ------------------------------
// NAVIGATION
// ------------------------------

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.getElementById("section-" + id).style.display = "block";

  document.querySelectorAll(".nav-link").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.nav-link[data-section="${id}"]`).classList.add("active");
}

document.querySelectorAll(".nav-link").forEach(btn => {
  btn.addEventListener("click", () => {
    showSection(btn.getAttribute("data-section"));
  });
});

document.querySelectorAll("[data-jump]").forEach(btn => {
  btn.addEventListener("click", () => {
    showSection(btn.getAttribute("data-jump"));
  });
});

// ------------------------------
// ADD ADMIN
// ------------------------------

document.getElementById("btn-save-admin").addEventListener("click", () => {
  const name = document.getElementById("admin-name").value.trim();
  const email = document.getElementById("admin-email").value.trim();
  const role = document.getElementById("admin-role").value;
  const status = document.getElementById("admin-status").value;

  if (!name || !email) {
    alert("Ranpli non ak imèl admin lan.");
    return;
  }

  admins.push({ name, email, role, status });
  renderAdminTable();
  updateAdminCount();
  addLog("MAX", "ADD ADMIN", "SYSTEM", `Nouvo admin ajoute: ${name} (${role}).`);

  document.getElementById("admin-name").value = "";
  document.getElementById("admin-email").value = "";
});

// ------------------------------
// CLEAR ADMIN FORM
// ------------------------------

document.getElementById("btn-clear-admin").addEventListener("click", () => {
  document.getElementById("admin-name").value = "";
  document.getElementById("admin-email").value = "";
});

// ------------------------------
// CLEAR LOGS
// ------------------------------

document.getElementById("btn-clear-logs").addEventListener("click", () => {
  if (!confirm("Netwaye tout logs vizyèl yo?")) return;
  logs.length = 0;
  renderLogs();
  renderOverviewLog();
  updateLastAction("LOGS CLEARED");
});

// ------------------------------
// MEDIA SIMULATION
// ------------------------------

document.getElementById("btn-upload-media").addEventListener("click", () => {
  const fileInput = document.getElementById("media-file");
  const type = document.getElementById("media-type").value;
  const status = document.getElementById("media-status");

  if (!fileInput.files.length) {
    alert("Chwazi yon fichye pou simile upload la.");
    return;
  }

  const fileName = fileInput.files[0].name;
  status.textContent = `Similasyon: ${fileName} (tip: ${type}) ajoute nan lis medya yo.`;

  addLog("MAX", "MEDIA UPLOAD (SIM)", "SYSTEM", `Simile upload pou fichye: ${fileName} (${type}).`);
});

// ------------------------------
// SETTINGS SIMULATION
// ------------------------------

document.getElementById("btn-save-settings").addEventListener("click", () => {
  const title = document.getElementById("site-title").value.trim();
  const color = document.getElementById("primary-color").value.trim();
  const url = document.getElementById("system-url").value.trim();
  const mode = document.getElementById("security-mode").value;

  document.getElementById("settings-status").textContent =
    "Paramèt sove vizyèlman nan sesyon sa a.";

  addLog(
    "MAX",
    "UPDATE SETTINGS",
    "SYSTEM",
    `Tit: "${title}", Koulè: ${color}, URL: ${url || "—"}, Sekirite: ${mode}.`
  );
});

// ------------------------------
// LOGOUT SIMULATION
// ------------------------------

document.querySelector(".logout-btn").addEventListener("click", () => {
  if (confirm("Simile LOGOUT SUPER ADMIN lan?")) {
    addLog("MAX", "SUPER ADMIN LOGOUT (SIM)", "SECURITY", "MAX fè logout vizyèl.");
    alert("Similasyon: LOGOUT SUPER ADMIN.");
  }
});

// ------------------------------
// INIT
// ------------------------------

updateAdminCount();
updateLastAccess();
updateLastAction("SUPER ADMIN LOGIN");
renderAdminTable();
renderLogs();
renderOverviewLog();
