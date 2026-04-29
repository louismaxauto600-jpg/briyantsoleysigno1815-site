const twilio = require("twilio");

exports.handler = async function (event) {
  try {
    const { group, message } = JSON.parse(event.body);

    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH
    );

    const contacts = [
      { name: "MAXIMAX", phone: "+13175381150", group: "admin" },
      { name: "Test User", phone: "+14076405166", group: "fanatik" }
    ];

    const selectedContacts =
      group === "all"
        ? contacts
        : contacts.filter(c => c.group === group);

    const results = [];

    for (const contact of selectedContacts) {
      try {
        const res = await client.messages.create({
          from: "whatsapp:+14155238886",
          to: "whatsapp:" + contact.phone,
          body: message
