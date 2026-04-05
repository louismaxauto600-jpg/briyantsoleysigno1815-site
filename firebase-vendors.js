// ============================================================
// BSS1815 — TI MACHANN DATABASE ENGINE
// Fichye: firebase-vendors.js
// ============================================================

import { db, storage } from "./firebase-config.js";
import {
  collection, addDoc, getDocs, doc, updateDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

/* ------------------------------------------------------------
   1. SAVE PHOTO AS ID
   ------------------------------------------------------------ */
export async function savePhotoAsID(fileBlob, vendorID) {
  const storageRef = ref(storage, `vendors/${vendorID}.jpg`);
  await uploadBytes(storageRef, fileBlob);
  return await getDownloadURL(storageRef);
}

/* ------------------------------------------------------------
   2. SAVE NEW VENDOR
   ------------------------------------------------------------ */
export async function saveVendor(data) {
  await addDoc(collection(db, "vendors"), data);
}

/* ------------------------------------------------------------
   3. GET ALL VENDORS
   ------------------------------------------------------------ */
export async function getVendors() {
  const snapshot = await getDocs(collection(db, "vendors"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/* ------------------------------------------------------------
   4. UPDATE VENDOR PAYMENT
   ------------------------------------------------------------ */
export async function updateVendorPayment(vendorDocID, newPaidAmount) {
  const vendorRef = doc(db, "vendors", vendorDocID);
  await updateDoc(vendorRef, { paid: newPaidAmount });
}
