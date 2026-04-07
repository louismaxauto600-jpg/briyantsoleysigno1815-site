const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Twilio credentials (ENV VARIABLES)
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

// WhatsApp numbers
const FROM = "whatsapp:+14155238886"; // Twilio Sandbox
const TO = "whatsapp:+509XXXXXXXX";  // Nimewo ou vle voye mesaj la

// Test route
app.get("/", (req, res) => {
  res.send("BSS1815 Backend PRO‑MAX is running");
});

// Send WhatsApp message
app.post("/send", async (req, res) => {
  const { message } = req.body;

  try {
    const msg = await client.messages.create({
      from: FROM,
      to: TO,
      body: message
    });

    res.json({ status: "sent", sid: msg.sid });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

// Receive WhatsApp messages
app.post("/whatsapp", (req, res) => {
  const MessagingResponse = twilio.twiml.MessagingResponse;
  const twiml = new MessagingResponse();

  const incoming = req.body.Body;
  twiml.message(`Mwen resevwa mesaj ou: ${incoming}`);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.listen(3000, () => console.log("Server running on port 3000"));
