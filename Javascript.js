// javascript.js — BRIYANTSOLEYSIGNO1815.COM - OFFICIAL
// Firebase BSS 1815 OFFICIAL CONFIG

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, Timestamp, collection, addDoc, query, where, getDocs, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signOut, updateEmail, updatePassword, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDenkzhQh5rHMoZYDXrM8zSSCCoX4gBcYY",
  authDomain: "briyant-soley-signo-1815.firebaseapp.com",
  projectId: "briyant-soley-signo-1815",
  storageBucket: "briyant-soley-signo-1815.appspot.com",
  messagingSenderId: "873317957685",
  appId: "1:873317957685:web:4cc037fd0a61cd8899717c",
  measurementId: "G-3QZ98KMJ0Z"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export async function chanjeEmail(nouvoEmail) {
  await updateEmail(auth.currentUser, nouvoEmail);
  await signOut(auth);
  window.location.href = "/login.html";
}
export async function chanjePasscode(nouvoPass) {
  await updatePassword(auth.currentUser, nouvoPass);
  await signOut(auth);
  window.location.href = "/login.html";
}
export async function logoutSecure() {
  sessionStorage.clear();
  await signOut(auth);
  window.location.href = "/";
}
export async function kreyeEnvitasyonAnimateur(siteId) {
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  await setDoc(doc(db, "invites", code), {
    site: siteId, role: "animateur", used: false,
    createdAt: Timestamp.now(),
    expiresAt: Timestamp.fromMillis(Date.now() + 6*60*60*1000)
  });
  return `https://briyantsoleysigno1815.com/invite.html?code=${code}`;
}
export async function valideEnvitasyon(code) {
  const snap = await getDoc(doc(db, "invites", code));
  if(!snap.exists() || snap.data().used === true) {
    throw new Error("Link sa a deja itilize oswa li ekspire.");
  }
  await updateDoc(doc(db, "invites", code), { used: true });
  await signInAnonymously(auth);
  sessionStorage.setItem('temp_role', 'animateur');
  sessionStorage.setItem('temp_site', snap.data().site);
  return snap.data();
}
export async function logTransaction({ type, amount, site, description }) {
  const user = auth.currentUser;
  const txRef = await addDoc(collection(db, "transactions"), {
    type: type || "general", amount: amount || 0, site: site || "bss1815",
    description: description || "", by: user ? user.uid : "system",
    byEmail: user && user.email ? user.email : "", createdAt: Timestamp.now()
  });
  const q = query(collection(db, "admins"), where("role", "in", ["super_admin", "admin"]), where("active", "==", true));
  const snap = await getDocs(q);
  const msg = `*BSS ALERT*\nTip: ${type}\nMontan: $${amount}\nSit: ${site}\nDetay: ${description}\nLè: ${new Date().toLocaleString()}`;
  const promises = [];
  snap.forEach(function(d) {
    const a = d.data(); const numero = a.whatsapp || a.phone;
    if (numero) { promises.push(addDoc(collection(db, "wa_queue"), { to: numero, message: msg, transactionId: txRef.id, role: a.role, channel: "whatsapp", status: "pending", createdAt: Timestamp.now() })); }
  });
  await Promise.all(promises);
  return txRef.id;
}
export async function ajouteAdmin(uid, role, whatsapp) {
  await setDoc(doc(db, "admins", uid), { role: role, whatsapp: whatsapp, phone: whatsapp, active: true, notifyWhatsapp: true, updatedAt: Timestamp.now() }, { merge: true });
}
export async function dezaktiveAdmin(uid) {
  await updateDoc(doc(db, "admins", uid), { active: false });
}
export async function getWhatsAppMessages(lim = 50) {
  const q = query(collection(db, "whatsapp_messages"), orderBy("createdAt", "desc"), limit(lim));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
export function listenWhatsAppMessages(callback, lim = 50) {
  const q = query(collection(db, "whatsapp_messages"), orderBy("createdAt", "desc"), limit(lim));
  return onSnapshot(q, (snap) => { const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() })); callback(msgs); });
}
export async function saveIncomingWhatsApp({ from, body, medias = [] }) {
  const messageSid = "MANUAL-" + Date.now();
  await setDoc(doc(db, "whatsapp_messages", messageSid), { messageSid: messageSid, from: from || "", body: body || "", medias: medias, numMedia: medias.length, hasMedia: medias.length > 0, source: "manual", createdAt: Timestamp.now() });
  return messageSid;
}
export async function queueWhatsAppMessage(to, message) {
  const ref = await addDoc(collection(db, "wa_queue"), { to: to, message: message, channel: "whatsapp", status: "pending", createdAt: Timestamp.now() });
  return ref.id;
}

// ============================================================
// AJOUT BSS1815 Q&A - pa manyen sa ki anlè a
// ============================================================
export const BSS1815_QA = [
  { id: "bss1815", keys: ["bss1815","ki sa","what is bss"], kre: "BSS1815 (Briyant Soley Signo 1815) se yon kominote ak eritaj ak 5 branch PRO-MAX: PRO-MAX FM, MaxiMax Multi Services, PRO-MAX Academie, PRO-MAX Beat Lab / Beat Maker AI School, ak DDN.", fra: "BSS1815 est une communaute avec 5 branches PRO-MAX.", eng: "BSS1815 is a community with 5 PRO-MAX branches." },
  { id: "fm", keys: ["fm","radyo","radio"], kre: "PRO-MAX FM se radyo kominote a: mizik, nouvel, ak pwogram kilti.", fra: "PRO-MAX FM est la radio communautaire.", eng: "PRO-MAX FM is the community radio." },
  { id: "multiservices", keys: ["multiservices","maximax","imigrasyon","immigration","taks"], kre: "Nou ede ak imigrasyon, taks, biznis, ak sevis notarial.", fra: "Nous aidons avec immigration, taxes, business et notaire.", eng: "We help with immigration, taxes, business and notary." },
  { id: "academie", keys: ["academie","academy","fomasyon"], kre: "PRO-MAX Academie ofri fomasyon ak setifikasyon, gen Real Estate School ak Insurance School.", fra: "PRO-MAX Academie offre formations et certifications.", eng: "PRO-MAX Academie offers training and certification." },
  { id: "realestate", keys: ["real estate","imobilye"], kre: "Real Estate School fome ou pou vin ajan imobilye setifye.", fra: "Real Estate School forme des agents immobiliers certifies.", eng: "Real Estate School trains certified real estate agents." },
  { id: "insurance", keys: ["insurance","asirans"], kre: "Insurance School fome ou pou vin ajan asirans setifye.", fra: "Insurance School forme des agents d'assurance certifies.", eng: "Insurance School trains certified insurance agents." },
  { id: "beatmaker", keys: ["beat maker","beatmaker"], kre: "Beat Maker AI School gen 10 kou konple, yon Profese AI, ak setifika.", fra: "Beat Maker AI School: 10 cours, Professeur AI, certificat.", eng: "Beat Maker AI School: 10 courses, AI Professor, certificate." },
  { id: "beatlab", keys: ["beat lab"], kre: "PRO-MAX Beat Lab se estidyo kreyatif pou pwodiksyon mizik.", fra: "PRO-MAX Beat Lab est le studio creatif.", eng: "PRO-MAX Beat Lab is the creative studio." },
  { id: "ddn", keys: ["ddn"], kre: "DDN se youn nan branch mouvman BSS1815 la.", fra: "DDN est une branche du mouvement BSS1815.", eng: "DDN is a branch of BSS1815." },
  { id: "acces", keys: ["akse","acces","access"], kre: "Pou jwenn akse PRO-MAX, enskri sou platfom ofisyel la.", fra: "Pour l'acces PRO-MAX, inscrivez-vous sur la plateforme officielle.", eng: "To get PRO-MAX access, register on the official platform." },
  { id: "prix", keys: ["pri","prix","price","konbyen"], kre: "Pri yo varye selon sevis la. Di nou ki sevis ou vle.", fra: "Les prix varient selon le service.", eng: "Prices vary by service." },
  { id: "horaire", keys: ["ore","horaire","hours"], kre: "Sevis kliyan AI a disponib 24/7.", fra: "Service client AI disponible 24/7.", eng: "AI customer service available 24/7." },
  { id: "langue", keys: ["lang","kreyol","franse"], kre: "Mwen pale Kreyol, Franse, ak Angle. Chwazi KRE / FRA / ENG.", fra: "Je parle creole, francais et anglais.", eng: "I speak Creole, French and English." },
  { id: "crm", keys: ["crm"], kre: "CRM se sistem jesyon relasyon kliyan. Sou BSS1815, li ede swiv kontak, tranzaksyon ak kominikasyon.", fra: "Le CRM est le systeme de gestion de la relation client.", eng: "CRM is the Customer Relationship Management system." },
  { id: "agent", keys: ["ajan","agent","moun","humain","human"], kre: "Ekri AJAN pou pale ak yon moun.", fra: "Ecrivez AGENT pour un humain.", eng: "Type AGENT for a human." },
  { id: "bonjour", keys: ["bonjou","bonjour","hello"], kre: "Bonjou! Mwen se Sevis Kliyan AI BSS1815. Poze m kesyon.", fra: "Bonjour! Je suis le Service Client AI BSS1815.", eng: "Hello! I am BSS1815 AI Customer Service." }
];
export let currentLangQA = "kre";
export function setQALang(l){ currentLangQA = l; }
export function getBSS1815Answer(question){
  const q = (question||"").toLowerCase();
  for(const item of BSS1815_QA){
    if(item.keys.some(k=>q.includes(k))) return item[currentLangQA] || item.kre;
  }
  if(currentLangQA==="fra") return "Je ne comprends pas. Ecrivez AGENT pour un humain, ou posez une question sur PRO-MAX FM, MaxiMax, Academie, Beat Lab, DDN.";
  if(currentLangQA==="eng") return "I don't understand. Type AGENT for a human, or ask about PRO-MAX FM, MaxiMax, Academie, Beat Lab, DDN.";
  return "Mwen pa konprann. Ekri AJAN pou yon moun, oswa poze yon kesyon sou PRO-MAX FM, MaxiMax, Academie, Beat Lab, DDN.";
}

// Konekte bwat chat ENVOYER ak Q&A - ajoute san kraze
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('input[placeholder*="question" i], input[placeholder*="crivez" i]');
    const allBtns = Array.from(document.querySelectorAll("button"));
    const sendBtn = allBtns.find(b => /ENVOYER/i.test(b.textContent));
    allBtns.forEach(b => {
      const t = b.textContent.trim().toUpperCase();
      if(t === "ENG") b.addEventListener("click", () => setQALang("eng"));
      if(t === "FRA") b.addEventListener("click", () => setQALang("fra"));
      if(t === "KRE") b.addEventListener("click", () => setQALang("kre"));
    });
    if(sendBtn && input){
      const doSend = () => {
        const q = input.value.trim();
        if(!q) return;
        const r = getBSS1815Answer(q);
        if (typeof window.ajouteBulChat === "function") {
          window.ajouteBulChat("user", q);
          window.ajouteBulChat("ai", r);
        } else {
          console.log("Q:", q, "R:", r);
        }
        input.value = "";
      };
      sendBtn.addEventListener("click", doSend);
      input.addEventListener("keydown", (e)=>{ if(e.key==="Enter") doSend(); });
    }
  });
}
