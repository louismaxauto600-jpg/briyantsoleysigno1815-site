const twilio = require("twilio");

exports.handler = async function () {
  const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH
  );

  const contacts = [
    { name: "MAXIMAX", phone: "+13175381150" },
    { name: "Test User", phone: "+14076405166" }
  ];

  const messageText = "🔥 BSS1815 mesaj ofisyèl pou tout fanatik yo";

  const results = [];

  for (const contact of contacts) {
    try {
      const res = await client.messages.create({
        from: "whatsapp:+14155238886",
        to: "whatsapp:" + contact.phone,
        body: messageText
      });

      results.push({
        name: contact.name,
        phone: contact.phone,
        status: "sent",
        sid: res.sid
      });
    } catch (error) {
      results.push({
        name: contact.name,
        phone: contact.phone,
        status: "failed",
        error: error.message
      });
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(results)
  };
};
