<script src="scripts/security-logger.js"></script>

<script>
    function login() {
        const user = document.getElementById("username").value.trim();
        const pass = document.getElementById("password").value.trim();
        const error = document.getElementById("errorMsg");

        const ADMIN_USER = "superadmin";
        const ADMIN_PASS = "1815";

        if (user === ADMIN_USER && pass === ADMIN_PASS) {

            // 1️⃣ SNIPPET #1 — LOGIN SUCCESS
            SecurityLogger.logLoginSuccess(user);

            window.location.href = "admin-dashboard.html";

        } else {

            // 2️⃣ SNIPPET #2 — LOGIN FAILED
            SecurityLogger.logLoginFailed(user);

            error.textContent = "Enfòmasyon yo pa kòrèk. Eseye ankò.";
        }
    }
</script>
