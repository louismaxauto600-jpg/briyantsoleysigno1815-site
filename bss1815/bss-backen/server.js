const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* ===============================
   BSS1815 — WHATSAPP TWILIO PRO‑MAX
   =============================== */

const accountSid = process.env.TWILIO_SID;
const authToken  = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

const FROM = "whatsapp:+14155238886"; 
const DEFAULT_TO = "whatsapp:+509XXXXXXXX";

// VOYE MESAJ BAY YON SÈL NIMEWO
async function sendWhatsAppAlert(message, toNumber = DEFAULT_TO) {
    try {
        const response = await client.messages.create({
            from: FROM,
            to: toNumber,
            body: message
        });

        console.log("ALÈT WHATSAPP VOYE ✔️ →", toNumber);
        return response.sid;

    } catch (error) {
        console.error("ERÈ WHATSAPP ❌ →", toNumber, error.message);
    }
}

// BROADCAST: VOYE MENM MESAJ LA BAY PLIZYÈ NIMEWO
async function sendWhatsAppBroadcast(message, numbers) {
    for (const number of numbers) {
        await sendWhatsAppAlert(message, `whatsapp:${number}`);
    }
}

/* ===============================
   BSS1815 DASHBOARD ROUTES
   =============================== */

app.get("/", (req, res) => {
  res.send("BSS1815 Backend PRO‑MAX is running");
});

// ROUTE POU VOYE MESAJ SINGLE
app.post("/send", async (req, res) => {
  const { message, to } = req.body;

  try {
    const sid = await sendWhatsAppAlert(message, `whatsapp:${to}`);
    res.json({ status: "sent", sid });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

// ROUTE POU BROADCAST
app.post("/broadcast", async (req, res) => {
  const { message, numbers } = req.body;

  try {
    await sendWhatsAppBroadcast(message, numbers);
    res.json({ status: "broadcast_sent" });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

// RECEIVE WEBHOOK
app.post("/whatsapp", (req, res) => {
  const MessagingResponse = twilio.twiml.MessagingResponse;
  const twiml = new MessagingResponse();

  const incoming = req.body.Body;
  twiml.message(`Mwen resevwa mesaj ou: ${incoming}`);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.listen(3000, () => console.log("Server running on port 3000"));
