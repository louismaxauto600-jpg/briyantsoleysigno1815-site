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

// ---------- FONKSYON ITILIZATÈ: Chanje EMAIL + PASSCODE ----------
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

// ---------- LOGOUT SECURE ----------
export async function logoutSecure() {
  sessionStorage.clear();
  await signOut(auth);
  window.location.href = "/";
}

// ---------- ENVITASYON ANIMATÈ (1 SEL FWA) ----------
export async function kreyeEnvitasyonAnimateur(siteId) {
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  await setDoc(doc(db, "invites", code), {
    site: siteId,
    role: "animateur",
    used: false,
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

// ---------- SISTÈM TRANZAKSYON + NOTIFIKASYON WHATSAPP OTOMATIK (TWILIO) ----------
// Koleksyon: "transactions" (istorik), "admins" (wol + nimewo WhatsApp), "wa_queue" (ke pou Cloud Function)

// 1. Anrejistre yon tranzaksyon + mete mesaj WhatsApp nan ke pou tout super_admin ak admin
export async function logTransaction({ type, amount, site, description }) {
  const user = auth.currentUser;
  const txRef = await addDoc(collection(db, "transactions"), {
    type: type || "general",
    amount: amount || 0,
    site: site || "bss1815",
    description: description || "",
    by: user ? user.uid : "system",
    byEmail: user && user.email ? user.email : "",
    createdAt: Timestamp.now()
  });

  // Pran tout admin ki aktif
  const q = query(
    collection(db, "admins"),
    where("role", "in", ["super_admin", "admin"]),
    where("active", "==", true)
  );
  const snap = await getDocs(q);

  const msg = `*BSS ALERT*\nTip: ${type}\nMontan: $${amount}\nSit: ${site}\nDetay: ${description}\nLè: ${new Date().toLocaleString()}`;

  const promises = [];
  snap.forEach(function(d) {
    const a = d.data();
    const numero = a.whatsapp || a.phone;
    if (numero) {
      promises.push(addDoc(collection(db, "wa_queue"), {
        to: numero,
        message: msg,
        transactionId: txRef.id,
        role: a.role,
        channel: "whatsapp",
        status: "pending",
        createdAt: Timestamp.now()
      }));
    }
  });
  await Promise.all(promises);
  return txRef.id;
}

// 2. Anrejistre / mete ajou yon admin ak nimewo WhatsApp li
// role: "super_admin" oswa "admin" | whatsapp: "+13055551234"
export async function ajouteAdmin(uid, role, whatsapp) {
  await setDoc(doc(db, "admins", uid), {
    role: role,
    whatsapp: whatsapp,
    phone: whatsapp,
    active: true,
    notifyWhatsapp: true,
    updatedAt: Timestamp.now()
  }, { merge: true });
}

// 3. Dezaktive notifikasyon yon admin (pa resevwa anko)
export async function dezaktiveAdmin(uid) {
  await updateDoc(doc(db, "admins", uid), { active: false });
}

// ---------- WHATSAPP INCOMING - TWILIO SANDBOX +14155238886 ----------
// Koleksyon: "whatsapp_messages" (tout mesaj k ap antre soti nan Twilio webhook)

// 4. Li tout mesaj WhatsApp ki save nan Firestore (pou dashboard admin)
export async function getWhatsAppMessages(lim = 50) {
  const q = query(
    collection(db, "whatsapp_messages"),
    orderBy("createdAt", "desc"),
    limit(lim)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// 5. Koute mesaj WhatsApp an dirèk (real-time pou dashboard)
export function listenWhatsAppMessages(callback, lim = 50) {
  const q = query(
    collection(db, "whatsapp_messages"),
    orderBy("createdAt", "desc"),
    limit(lim)
  );
  return onSnapshot(q, (snap) => {
    const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(msgs);
  });
}

// 6. Save yon mesaj WhatsApp manyèlman (pou tès san webhook)
export async function saveIncomingWhatsApp({ from, body, medias = [] }) {
  const messageSid = "MANUAL-" + Date.now();
  await setDoc(doc(db, "whatsapp_messages", messageSid), {
    messageSid: messageSid,
    from: from || "",
    body: body || "",
    medias: medias,
    numMedia: medias.length,
    hasMedia: medias.length > 0,
    source: "manual",
    createdAt: Timestamp.now()
  });
  return messageSid;
}

// 7. Voye yon mesaj WhatsApp via ke (pou Cloud Function voye li ak Twilio)
export async function queueWhatsAppMessage(to, message) {
  const ref = await addDoc(collection(db, "wa_queue"), {
    to: to,
    message: message,
    channel: "whatsapp",
    status: "pending",
    createdAt: Timestamp.now()
  });
  return ref.id;
}
