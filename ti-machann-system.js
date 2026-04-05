/* ============================================================
   BSS1815 — TI MACHANN SYSTEM (CORE ENGINE)
   Fichye: ti-machann-system.js
   Fonksyon prensipal:
   - Jenere ID otomatik
   - Sove nouvo machann
   - Sove foto kòm ID
   - Mete ajou peman
   - Kreye badge
   - Konekte tout paj yo
   ============================================================ */

/* ------------------------------------------------------------
   1. GENERATE AUTOMATIC ID
   ------------------------------------------------------------ */

function generateVendorID(lastID) {
  // lastID egzanp: "TM-2026-014"
  if (!lastID) return "TM-2026-001";

  const parts = lastID.split("-");
  const year = parts[1];
  let number = parseInt(parts[2]);

  number++;

  const newNumber = String(number).padStart(3, "0");
  return `TM-${year}-${newNumber}`;
}

/* ------------------------------------------------------------
   2. SAVE NEW VENDOR
   ------------------------------------------------------------ */

async function saveVendor(data) {
  // data = { name, phone, type, amount, days, notes, photoURL, id }
  console.log("SOVE TI MACHANN:", data);

  // Firebase oswa backend ou ap vini isit la
}

/* ------------------------------------------------------------
   3. SAVE PHOTO AS ID
   ------------------------------------------------------------ */

async function savePhotoAsID(fileBlob) {
  // Upload foto nan storage
  console.log("SOVE FOTO KÒM ID…");

  // Retounen URL foto a
  return "https://example.com/photo.jpg";
}

/* ------------------------------------------------------------
   4. RECORD PAYMENT
   ------------------------------------------------------------ */

async function recordPayment(vendorID, amount, method) {
  console.log("PEMAN ANREJISTRE:", vendorID, amount, method);

  // Mete ajou total peye
}

/* ------------------------------------------------------------
   5. GENERATE BADGE
   ------------------------------------------------------------ */

function generateBadge(vendor) {
  return {
    id: vendor.id,
    name: vendor.name,
    phone: vendor.phone,
    amount: vendor.amount,
    photo: vendor.photoURL,
    qr: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${vendor.id}`
  };
}

/* ------------------------------------------------------------
   6. EXPORT FUNCTIONS
   ------------------------------------------------------------ */

window.TiMachannSystem = {
  generateVendorID,
  saveVendor,
  savePhotoAsID,
  recordPayment,
  generateBadge
};
