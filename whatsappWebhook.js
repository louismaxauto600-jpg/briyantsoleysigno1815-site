const admin = require('firebase-admin');
const db = admin.firestore();

async function handleWhatsApp(req, res) {
  const { From, Body, NumMedia, MessageSid } = req.body;

  let medias = [];
  let num = parseInt(NumMedia || 0);
  for (let i = 0; i < num; i++) {
    medias.push({
      url: req.body[`MediaUrl${i}`],
      type: req.body[`MediaContentType${i}`]
    });
  }

  await db.collection('whatsapp_messages').doc(MessageSid).set({
    from: From,
    body: Body || '',
    medias: medias,
    numMedia: num,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  res.set('Content-Type', 'text/xml');
  res.send('<Response></Response>');
}

module.exports = { handleWhatsApp };
