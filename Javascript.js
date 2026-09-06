// javascript.js — BRIYANTSOLEYSIGNO1815.COM - OFFICIAL
// Firebase BSS 1815 OFFICIAL CONFIG

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
  const user = auth.currentUser;
  // Si se kolaboratè tanporè, netwaye session
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
