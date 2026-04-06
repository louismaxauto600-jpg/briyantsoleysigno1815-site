/* ------------------------------------------------------
   BSS1815 OFFICIAL APPROVE / REJECT SYSTEM
   Sa jere:
   - Approve uploads
   - Reject uploads
   - Modifye JSON (Simulated Mode)
   - Log aksyon admin yo
------------------------------------------------------ */


// ------------------------------------------------------
// GENERIC FUNCTION: UPDATE STATUS
// ------------------------------------------------------

async function updateStatus(database, id, newStatus) {
    console.log(`🔧 [SYSTEM] Ap modifye ${database} → ID: ${id} → ${newStatus}`);

    // Nan yon backend reyèl, ou ta fè:
    // fetch(`/database/${database}`, { method: "PUT", body: JSON.stringify(...) })

    alert(`Upload #${id} modifye: ${newStatus.toUpperCase()} (Simulated Mode)`);

    // Reload page pou montre chanjman yo
    location.reload();
}


// ------------------------------------------------------
// FAN UPLOADS
// ------------------------------------------------------

function approveFan(id) {
    updateStatus("fan_uploads.json", id, "approved");
}

function rejectFan(id) {
    updateStatus("fan_uploads.json", id, "rejected");
}


// ------------------------------------------------------
// LEADERS UPLOADS
// ------------------------------------------------------

function approveLeader(id) {
    updateStatus("leaders_uploads.json", id, "approved");
}

function rejectLeader(id) {
    updateStatus("leaders_uploads.json", id, "rejected");
}


// ------------------------------------------------------
// EVENTS MEDIA
// ------------------------------------------------------

function approveEvent(id) {
    updateStatus("events_media.json", id, "approved");
}

function rejectEvent(id) {
    updateStatus("events_media.json", id, "rejected");
}


// ------------------------------------------------------
// TEAMS MEDIA
// ------------------------------------------------------

function approveTeam(id) {
    updateStatus("team_media.json
