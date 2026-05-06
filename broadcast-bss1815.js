const accountSid = 'VIRE_ACCOUNT_SID_W';
const authToken = 'VIRE_AUTH_TOKEN_W';
const client = require('twilio')(accountSid, authToken);

// LIS MANM YO — BSS 1815 OFFICIEL
const members = [
  { name: "VICE-PREZIDAN YGENS", phone: "+15618091476" },
  { name: "FANFAN TREZORYE", phone: "+15612899763" },
  { name: "BAWON PLENN LAN", phone: "+14076272176" },
  { name: "MAGISTRAT MAUCLAIR", phone: "+50939017427" },
  { name: "MARIO BRIYANT", phone: "+50940451023" },
  { name: "RORO POTE-PAROLE", phone: "+50937143828" },
  { name: "PÈRODIN", phone: "+14073381918" },
  { name: "ANPERÈ TI RAT", phone: "+19543264216" },
  { name: "VALERY MOTIVATÈ", phone: "+13476706457" },
  { name: "VICE-PREZIDAN ERNSO", phone: "+50936211514" },
  { name: "PDG TI FRÈ", phone: "+13475723197" },
  { name: "MAGISTRAT JUNIOR", phone: "+50944929615" },
  { name: "ANPERÈ DOUDOU", phone: "+50941320020" },
  { name: "CANGE KÒDONATÈ", phone: "+50943437488" },
  { name: "DJEMATANN FINANS", phone: "+50932768783" },
  { name: "JEFF COLIN", phone: "+13476409651" },
  { name: "MASS VOKAL", phone: "+16893232079" },
  { name: "MAXIMA BON BAGAY", phone: "+14076405166" },
  { name: "MAMBO FIFI", phone: "+13176887344" },
  { name: "ONES BON BAGAY", phone: "+590690088821" },
  { name: "MONTINAT", phone: "+33745752135" },
  { name: "JIJ MAYAN", phone: "+50937045157" },
  { name: "RORO LAJAN", phone: "+15167378242" },
  { name: "RALPH FLORIAL", phone: "+16467077740" },
  { name: "VICE-PREZIDAN TATANE", phone: "+13479458913" }
];

// BLOK MESAJ OFISYÈL BSS 1815
const messageBody = 
`🟠⚫ BRIYANT SOLÈY SIGNO 1815 ⚫🟠
🔥 MESAJ OFISYÈL BSS 1815 🔥

Nou se:
• Yon Vizyon
• Yon Mouvman
• Yon Disiplin`;

async function sendBroadcast() {
  console.log("🚀 Kòmanse voye mesaj bay tout manm BSS 1815...\n");

  for (const member of members) {
    try {
      const msg = await client.messages.create({
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${member.phone}`,
        body: messageBody
      });

      console.log(`✔️ Mesaj voye bay ${member.name} (${member.phone}) — SID: ${msg.sid}`);
    } catch (error) {
      console.log(`❌ ERÈ pou ${member.name} (${member.phone}):`, error.message);
    }
  }

  console.log("\n🏁 BROADCAST BSS 1815 FINI — TOUT MANM YO RESEVWA MESAJ LA.");
}

sendBroadcast();
