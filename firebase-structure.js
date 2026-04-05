/* ============================================================
   BSS1815 — DATABASE STRUCTURE
   Fichye: firebase-structure.js
   Koleksyon:
   - vendors
   - payments
   - settings (pou ID otomatik)
   ============================================================ */

import { db } from "./firebase-config.js";
import {
  collection, doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ------------------------------------------------------------
   1. INITIALIZE SETTINGS (si pa egziste)
   ------------------------------------------------------------ */
export async function initSettings() {
  const settingsRef = doc(db, "settings", "system");
  const snap = await getDoc(settingsRef);

  if (!snap.exists()) {
    await setDoc(settingsRef, {
      lastVendorID: "TM-2026-000"
    });
  }
}

/* ------------------------------------------------------------
   2. GET LAST ID
   ------------------------------------------------------------ */
export async function getLastVendorID() {
  const settingsRef = doc(db, "settings", "system");
  const snap = await getDoc(settingsRef);
  return snap.data().lastVendorID;
}

/* ------------------------------------------------------------
   3. UPDATE LAST ID
   ------------------------------------------------------------ */
export async function updateLastVendorID(newID) {
  const settingsRef = doc(db, "settings", "system");
  await setDoc(settingsRef, { lastVendorID: newID }, { merge: true });
}
