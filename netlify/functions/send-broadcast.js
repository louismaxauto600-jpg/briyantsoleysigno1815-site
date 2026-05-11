const twilio = require("twilio");

exports.handler = async function (event) {
  try {
    const { message } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Pa gen mesaj." })
      };
    }

    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const numbers = [
      "whatsapp:+13175381150",
      "whatsapp:+14076405166"
    ];

    const results = [];

    for (const number of numbers) {
      try {
        const sent = await client.messages.create({
          from: "whatsapp:+14155238886",
          to: number,
          body: message
        });

        results.push({
          to: number,
          status: "sent",
          sid: sent.sid
        });

      } catch (error) {
        results.push({
          to: number,
          status: "failed",
          error: error.message
        });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        total: numbers.length,
        results
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
