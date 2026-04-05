TiMachannAdmin.createVendor(data, videoElement)/* ============================================================
   BSS1815 — ADMIN SYSTEM ENGINE (FINAL CORE)
   Fichye: admin-system.js
   Sa a mare TOUT modil yo ansanm:
   - ID otomatik
   - Foto kòm ID
   - QR code
   - Sove machann
   - Sove peman
   - Mete ajou estati
   ============================================================ */

import { generateNextVendorID } from "./id-generator.js";
import { capturePhoto, uploadPhotoAsID } from "./photo-id.js";
import { generateVendorQR } from "./qr-generator.js";
import { saveVendor, updateVendorPayment } from "./firebase-vendors.js";
import { recordPayment } from "./firebase-payments.js";
import { initSettings } from "./firebase-structure.js";

/* ------------------------------------------------------------
   1. INITIALIZE SYSTEM
   ------------------------------------------------------------ */
export async function initSystem() {
  await initSettings();
  console.log("BSS1815 SYSTEM READY ✔");
}

/* ------------------------------------------------------------
   2. CREATE NEW VENDOR (FULL WORKFLOW)
   ------------------------------------------------------------ */
export async function createVendor(data, videoElement = null) {
  // 1. Jenere ID otomatik
  const vendorID = await generateNextVendorID();

  // 2. Si gen foto kamera → kaptire + upload
  let photoURL = "";
  if (videoElement) {
    const blob = await capturePhoto(videoElement);
    photoURL = await uploadPhotoAsID(blob, vendorID);
  }

  // 3. Kreye QR code
  const qrURL = generateVendorQR(vendorID);

  // 4. Sove nan database
  const vendorData = {
    id: vendorID,
    name: data.name,
    phone: data.phone,
    type: data.type,
    amount: data.amount,
    paid: 0,
    days: data.days,
    notes: data.notes,
    photoURL,
    qrURL,
    createdAt: new Date().toISOString()
  };

  await saveVendor(vendorData);

  return vendorData;
}

/* ------------------------------------------------------------
   3. PROCESS PAYMENT
   ------------------------------------------------------------ */
export async function processPayment(vendorDocID, vendorData, amount, method) {
  // 1. Anrejistre peman an
  await recordPayment(vendorData.id, amount, method);

  // 2. Mete ajou total peye
  const newPaid = vendorData.paid + amount;
  await updateVendorPayment(vendorDocID, newPaid);

  return newPaid;
}
