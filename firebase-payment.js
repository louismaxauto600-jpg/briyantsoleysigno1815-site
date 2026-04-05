// ============================================================
// BSS1815 — PAYMENT ENGINE
// Fichye: firebase-payments.js
// ============================================================

import { db } from "./firebase-config.js";
import {
  collection, addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ------------------------------------------------------------
   RECORD PAYMENT
   ------------------------------------------------------------ */
export async function recordPayment(vendorID, amount, method) {
  await addDoc(collection(db, "payments"), {
    vendorID,
    amount,
    method,
    date: new Date().toISOString()
  });
}
