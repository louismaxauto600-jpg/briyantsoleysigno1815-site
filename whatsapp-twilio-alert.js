// ===============================
//  BSS1815 — WHATSAPP TWILIO PRO‑MAX
// ===============================

const accountSid = "YOUR_ACCOUNT_SID";
const authToken  = "YOUR_AUTH_TOKEN";
const client = require("twilio")(accountSid, authToken);

// FONKSYON POU VOYE MESAJ WHATSAPP
async function sendWhatsAppAlert(message) {
    try {
        const response = await client.messages.create({
            from: "whatsapp:+14155238886",   // Twilio WhatsApp Sender
            to:   "whatsapp:+1XXXXXXXXXX",   // Nimewo ou vle resevwa alèt la
            body: message
        });

        console.log("ALÈT WHATSAPP VOYE ✔️");
        return response.sid;

    } catch (error) {
        console.error("ERÈ WHATSAPP ❌", error);
    }
}

// EXEMPLE ALÈT
sendWhatsAppAlert("BSS1815 ALERT: Nouvo tranzaksyon detekte.");
