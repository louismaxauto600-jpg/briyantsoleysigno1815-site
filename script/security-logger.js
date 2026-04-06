/* ------------------------------------------------------
   BSS1815 OFFICIAL SECURITY LOGGER — PRO-MAX
   Sa jere:
   - Login attempts
   - Password reset
   - Approve / Reject actions
   - Upload actions
   - Admin activity
   - Security alerts
   (SIMULATION MODE — montre nan console + alert)
------------------------------------------------------ */


// ------------------------------------------------------
// GENERIC LOGGER FUNCTION
// ------------------------------------------------------

function logSecurity(action, user = "UNKNOWN") {
    const logEntry = {
        log_id: "LOG-" + Date.now(),
        action: action,
        user: user,
        timestamp: new Date().toISOString()
    };

    console.log("🛡 SECURITY LOG:", logEntry);

    // Nan yon backend reyèl, ou ta fè:
    // fetch("/database/super-admin-security.json", { method: "POST", body: JSON.stringify(logEntry) })

    alert(`SECURITY LOG: ${action} (Simulated Mode)`);
}


// ------------------------------------------------------
// LOGIN EVENTS
// ------------------------------------------------------

function logLoginSuccess(username) {
    logSecurity("LOGIN_SUCCESS", username);
}

function logLoginFailed(username) {
    logSecurity("LOGIN_FAILED", username);
}


// ------------------------------------------------------
// PASSWORD RESET
// ------------------------------------------------------

function logPasswordReset(username) {
    logSecurity("PASSWORD_RESET", username);
}


// ------------------------------------------------------
// UPLOAD EVENTS
// ------------------------------------------------------

function logFanUpload(username) {
    logSecurity("FAN_UPLOAD", username);
}

function logLeaderUpload(username) {
    logSecurity("LEADER_UPLOAD", username);
}


// ------------------------------------------------------
// APPROVE / REJECT EVENTS
// ------------------------------------------------------

function logApprove(username, itemId) {
    logSecurity(`APPROVE_ITEM_${itemId}`, username);
}

function logReject(username, itemId) {
    logSecurity(`REJECT_ITEM_${itemId}`, username);
}


// ------------------------------------------------------
// EXPORT GLOBAL
// ------------------------------------------------------

window.SecurityLogger = {
    logLoginSuccess,
    logLoginFailed,
    logPasswordReset,
    logFanUpload,
    logLeaderUpload,
    logApprove,
    logReject
};
