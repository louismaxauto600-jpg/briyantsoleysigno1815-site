exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();

  twiml.message(
`🟠⚫ BRIYANT SOLÈY SIGNO 1815 ⚫🟠
🔥 MESAJ OFISYÈL BSS 1815 🔥

Nou se:
• Yon Vizyon
• Yon Mouvman
• Yon Disiplin`
  );

  return callback(null, twiml);
};
