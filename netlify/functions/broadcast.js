const twilio = require('twilio');

exports.handler = async function () {
  const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+509XXXXXXXX',
    body: 'BSS1815 TEST OK'
  });

  return {
    statusCode: 200,
    body: 'Message sent'
  };
};
