// javascript.js — BRIYANTSOLEYSIGNO1815.COM - OFFICIAL
// Firebase BSS 1815 OFFICIAL CONFIG

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, getDocs, Timestamp, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signOut, updateEmail, updatePassword, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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

// =====================================================
// AJOUT YO SELMAN - pa retire anyen anwo a
// =====================================================
export const SITES = ["insurance","realestate","deal","promaxfm","ddn","bss1815"];
export const SITE_NAMES = {
  insurance: "Briyant Soley Insurance",
  realestate: "Briyant Soley Real Estate",
  deal: "Briyant Deal",
  promaxfm: "Promax FM",
  ddn: "DDN",
  bss1815: "Briyant Soley Signo 1815"
};
export function getTempSession(){return{role:sessionStorage.getItem('temp_role'),site:sessionStorage.getItem('temp_site')};}
export function isTempAnimateur(){const s=getTempSession();return s.role==='animateur'&&!!s.site;}
export function canAccessSite(siteId){if(isTempAnimateur())return getTempSession().site===siteId;return true;}
export function protectPage(siteId){if(isTempAnimateur()&&!canAccessSite(siteId)){document.body.innerHTML="<h1 style='text-align:center;margin-top:50px'>Ou pa gen aksè sou sit sa a.</h1>";throw new Error("Aksè refize");}}
export function showToast(msg,type="info"){let el=document.getElementById("bss-toast");if(!el){el=document.createElement("div");el.id="bss-toast";el.style.cssText="position:fixed;bottom:20px;right:20px;z-index:9999;padding:12px 18px;border-radius:8px;color:#fff;font-weight:600;";document.body.appendChild(el);}el.textContent=msg;el.style.background=type==="error"?"#c0392b":type==="success"?"#27ae60":"#2c3e50";el.style.display="block";setTimeout(()=>el.style.display="none",3000);}
export async function logAktivite(action,details={}){try{const uid=auth.currentUser?auth.currentUser.uid:"anonim";await setDoc(doc(collection(db,"logs")),{uid,action,details,timestamp:serverTimestamp(),site:getTempSession().site||"bss1815"});}catch(e){console.warn("log fail",e);}}
export async function uploadFiche(file,siteId,dossier="fiches"){if(!file)throw new Error("Pa gen fiche");const path=`${siteId}/${dossier}/${Date.now()}_${file.name}`;const sr=ref(storage,path);await uploadBytes(sr,file);const url=await getDownloadURL(sr);await logAktivite("upload",{site:siteId,file:file.name});return url;}
document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll("[data-logout]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();logoutSecure();}));});
onAuthStateChanged(auth,()=>{});
window.BSS={kreyeEnvitasyonAnimateur,valideEnvitasyon,logoutSecure,chanjeEmail,chanjePasscode,getTempSession,isTempAnimateur,canAccessSite,protectPage,showToast,logAktivite,uploadFiche,SITES};
