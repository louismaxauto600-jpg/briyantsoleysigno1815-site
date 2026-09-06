exports.handler = function (context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();

  // Mesaj moun nan voye a (an miniskil, san espas nan kòmansman/fen)
  const incoming = (event.Body || '').trim().toLowerCase();

  // Mo kle senp pou detekte lang lan
  const frenchWords = ['bonjour', 'bonsoir', 'salut', 'merci', 'oui', 'non'];
  const englishWords = ['hello', 'hi', 'hey', 'thanks', 'yes', 'no', 'good morning', 'good evening'];

  let lang = 'ht'; // default: Kreyòl

  if (frenchWords.some(word => incoming.includes(word))) {
    lang = 'fr';
  } else if (englishWords.some(word => incoming.includes(word))) {
    lang = 'en';
  }

  const messages = {
    ht: `BRIYANT SOLEY SIGNO 1815 🇭🇹\n\nAlo! Byenveni. Kijan nou ka ede w jodi a?\n\nTape "FR" pou Français oswa "EN" for English.`,
    fr: `BRIYANT SOLEY SIGNO 1815 🇫🇷\n\nBonjour! Bienvenue. Comment pouvons-nous vous aider aujourd'hui?\n\nTapez "HT" pour Kreyòl ou "EN" for English.`,
    en: `BRIYANT SOLEY SIGNO 1815 🇺🇸\n\nHello! Welcome. How can we help you today?\n\nType "HT" for Kreyòl or "FR" pour Français.`
  };

  // Si moun nan tape kòd lang lan dirèkteman (HT, FR, EN), sèvi ak sa
  if (incoming === 'ht') {
    lang = 'ht';
  } else if (incoming === 'fr') {
    lang = 'fr';
  } else if (incoming === 'en') {
    lang = 'en';
  }

  const reply = messages[lang];

  twiml.message(reply);

  callback(null, twiml);
};
