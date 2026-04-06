/* ------------------------------------------------------
   BSS1815 OFFICIAL UPLOAD-HANDLER.JS
   Sa a se motè prensipal ki jere:
   - Upload fanatik yo
   - Upload Super Admin & Admin yo
   - Preparasyon pou sove nan JSON database
   - Estrikti PRO-MAX pou konekte ak backend pita
------------------------------------------------------ */


// ------------------------------------------------------
// GENERIC FUNCTION: PREPARE UPLOAD DATA
// ------------------------------------------------------

function prepareUploadData(type, data) {
    return {
        upload_type: type,              // "fan" or "leader"
        ...data,
        upload_id: Date.now(),
        upload_date: new Date().toISOString()
    };
}


// ------------------------------------------------------
// SAVE TO JSON (SIMULATION MODE)
// ------------------------------------------------------
// NOTE: Nan vèsyon PRO-MAX final la, sa ap voye done yo
// nan yon API oswa Firebase. Pou kounye a, nou simile.

function saveToJSON(filename, newData) {
    console.log(`📁 [UPLOAD-HANDLER] Ap sove nan ${filename}...`);
    console.log("Done:", newData);

    // Nan yon backend reyèl, ou ta fè:
    // fetch(`/database/${filename}`, { method: "POST", body: JSON.stringify(newData) })

    alert("Upload sove avèk siksè nan Media Library (Simulated Mode).");
}



// ------------------------------------------------------
// FAN UPLOAD HANDLER
// ------------------------------------------------------

function handleFanUpload(formData) {
    const uploadData = prepareUploadData("fan", {
        fan_name: formData.name,
        fan_email: formData.email,
        description: formData.description,
        file_name: formData.file.name,
        file_type: formData.file.type,
        status: "pending"
    });

    saveToJSON("fan_uploads.json", uploadData);
}



// ------------------------------------------------------
// LEADERS UPLOAD HANDLER
// ------------------------------------------------------

function handleLeaderUpload(formData) {
    const uploadData = prepareUploadData("leader", {
        admin_name: formData.admin,
        category: formData.category,
        description: formData.description,
        file_name: formData.file.name,
        file_type: formData.file.type
    });

    saveToJSON("leaders_uploads.json", uploadData);
}



// ------------------------------------------------------
// EXPORT FUNCTIONS (GLOBAL ACCESS)
// ------------------------------------------------------

window.UploadHandler = {
    handleFanUpload,
    handleLeaderUpload
};


// ------------------------------------------------------
// END OF UPLOAD-HANDLER.JS
// ------------------------------------------------------
