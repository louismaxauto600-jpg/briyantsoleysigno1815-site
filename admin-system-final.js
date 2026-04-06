/* ============================================================
   BSS1815 — ADMIN SYSTEM ENGINE (PRO‑MAX VERSION)
   ============================================================ */

/* ------------------------------------------------------------
   1) VERIFY ADMIN SESSION (local mode)
   ------------------------------------------------------------ */
function checkAdmin() {
    const isAdmin = localStorage.getItem("bss_admin_logged");

    if (!isAdmin) {
        alert("Aksè entèdi! Ou dwe konekte kòm ADMIN.");
        window.location.href = "index.html";
    }
}

checkAdmin();

/* ------------------------------------------------------------
   2) BUTTON ACTIONS (SUPER ADMIN CONTROL)
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".admin-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const action = btn.innerText.trim();

            switch(action) {

                case "📌 Jere Mizisyen yo":
                    goTo("manage-musicians.html");
                    break;

                case "📌 Jere Lèt yo":
                    goTo("manage-letters.html");
                    break;

                case "📌 Upload Foto":
                    goTo("upload-photo.html");
                    break;

                case "📌 Jere Kont yo":
                    goTo("manage-accounts.html");
                    break;

                case "📌 Logout":
                    logoutAdmin();
                    break;

                default:
                    alert("Aksyon pa rekonèt!");
            }
        });
    });
});

/* ------------------------------------------------------------
   3) ROUTING FUNCTION (PRO‑MAX)
   ------------------------------------------------------------ */
function goTo(page) {
    window.location.href = page;
}

/* ------------------------------------------------------------
   4) LOGOUT FUNCTION
   ------------------------------------------------------------ */
function logoutAdmin() {
    localStorage.removeItem("bss_admin_logged");
    alert("Ou dekonekte avèk siksè.");
    window.location.href = "index.html";
}

/* ------------------------------------------------------------
   5) VISUAL FEEDBACK (PRO‑MAX)
   ------------------------------------------------------------ */
document.querySelectorAll(".admin-btn").forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(0.97)";
    });

    btn.addEventListener("mouseup", () => {
        btn.style.transform = "scale(1)";
    });
});
