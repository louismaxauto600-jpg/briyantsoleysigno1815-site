const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Twilio credentials
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

// WhatsApp numbers
const FROM = "whatsapp:+14155238886"; // Twilio Sandbox
const TO = "whatsapp:+509XXXXXXXX";  // Nimewo ou vle voye mesaj la

// Send WhatsApp message
app.get("/send", async (req, res) => {
  try {
    const message = await client.messages.create({
      from: FROM,
      to: TO,
      body: "BSS1815 WhatsApp PRO‑MAX connected successfully!"
    });

    res.send("Message sent: " + message.sid);
  } catch (err) {
    res.send("Error: " + err.message);
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
