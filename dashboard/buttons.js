// FICHYE: /js/dashboard-buttons.js

import { auth } from "./firebase-auth.js";
import { getUserRole } from "./firebase-roles.js";

const btnSuper = document.getElementById("btnSuperAdmin");
const btnAdmin = document.getElementById("btnAdmin");

// Kache yo pa default
btnSuper.style.display = "none";
btnAdmin.style.display = "none";

auth.onAuthStateChanged(async (user) => {
    if (!user) return;

    const role = await getUserRole(user.uid);

    if (role === "SUPER_ADMIN") {
        btnSuper.style.display = "block";
        btnAdmin.style.display = "block";
    }

    else if (role === "ADMIN") {
        btnAdmin.style.display = "block";
    }
});

// LYE BOUTON YO AK PAJ YO
btnSuper.addEventListener("click", () => {
    window.location.href = "/admin/super-admin.html";
});

btnAdmin.addEventListener("click", () => {
    window.location.href = "/admin/admin-dashboard.html";
});
