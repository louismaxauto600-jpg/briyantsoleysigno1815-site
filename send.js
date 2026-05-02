const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const members = require("./members.json");

const message = `
BRIYANT SOLÈY SIGNO 1815 – AVIS BLOCK CALLS

Tout manm yo oblije reponn BLOCK CALLS Dimanch 05‑03‑2026 pou lansman derapman sezon 2026‑2027 la.

Kote: Lokal BSS 1815
Lè: 12:00 PM – 5:30 PM
Objektif: Derapman 2026‑2027 – Estrikti – Disiplin – Seksyon Mizikal – Plan Aksyon

Prezans obligatwa.
Reta oswa absans san rezon = mank disiplin.

BSS 1815 – SAN PRESYON.
`;

async function sendBroadcast() {
  for (const m of members) {
    await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio WhatsApp Sender
      to: `whatsapp:${m.phone}`,
      body: message
    });

    console.log(`✔ Mesaj voye bay: ${m.name} (${m.phone})`);
  }
}

sendBroadcast();
