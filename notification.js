// CONFIG TWILIO
const TWILIO_SID = "YOUR_TWILIO_SID";
const TWILIO_TOKEN = "YOUR_TWILIO_AUTH_TOKEN";
const TWILIO_NUMBER = "+1XXXXXXXXXX"; // Twilio number
const ADMIN_PHONE = "+1XXXXXXXXXX";  // Telefòn ou

async function sendAlert(message) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;

  const data = new URLSearchParams();
  data.append("To", ADMIN_PHONE);
  data.append("From", TWILIO_NUMBER);
  data.append("Body", message);

  await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + btoa(`${TWILIO_SID}:${TWILIO_TOKEN}`),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
}
