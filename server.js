import express from "express";
import dotenv from "dotenv";
import twilio from "twilio";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post("/send-whatsapp", async (req, res) => {
  try {
    const { message, to } = req.body;

    const response = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`,
      body: message,
    });

    res.json({ success: true, sid: response.sid });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log("WHATSAPP TWILIO SERVER RUNNING ON PORT 3000");
});
