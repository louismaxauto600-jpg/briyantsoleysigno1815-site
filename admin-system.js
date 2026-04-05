// ==========================================
//  BSS1815 — ADMIN SYSTEM PRO‑MAX
//  AVÈK WHATSAPP TWILIO ALERTS
// ==========================================

// 🔥 IMPORT TWILIO ALERT FUNCTION
const { sendWhatsAppAlert } = require("./whatsapp-twilio-alert");

// 🔥 ADMIN SYSTEM CORE
const AdminSystem = {
    
    // SUPER ADMIN LOGIN
    superAdminLogin(id, password) {
        if (id === "SUPERADMIN" && password === "TEMP123") {
            console.log("SUPER ADMIN CONNECTED ✔️");
            sendWhatsAppAlert("SUPER ADMIN CONNECTED TO BSS1815 SYSTEM");
            return true;
        } else {
            console.log("SUPER ADMIN LOGIN FAILED ❌");
            sendWhatsAppAlert("FAILED SUPER ADMIN LOGIN ATTEMPT");
            return false;
        }
    },

    // ADMIN LOGIN
    adminLogin(id, password) {
        console.log(`ADMIN ${id} CONNECTED ✔️`);
        sendWhatsAppAlert(`ADMIN ${id} CONNECTED TO SYSTEM`);
        return true;
    },

    // AJOUT ADMIN
    addAdmin(name) {
        console.log(`ADMIN ${name} ADDED ✔️`);
        sendWhatsAppAlert(`NEW ADMIN ADDED: ${name}`);
    },

    // RETIRE ADMIN
    removeAdmin(name) {
        console.log(`ADMIN ${name} REMOVED ❌`);
        sendWhatsAppAlert(`ADMIN REMOVED: ${name}`);
    },

    // FINANCIAL TRANSACTION ALERT
    financialTransaction(amount) {
        console.log(`TRANSACTION: $${amount} ✔️`);
        sendWhatsAppAlert(`FINANCIAL ALERT: TRANSACTION OF $${amount} DETECTED`);
    },

    // SYSTEM RESET
    systemReset() {
        console.log("SYSTEM RESET EXECUTED ⚠️");
        sendWhatsAppAlert("⚠️ SYSTEM RESET EXECUTED BY SUPER ADMIN");
    }
};

module.exports = AdminSystem;
