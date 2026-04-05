/* ============================================================
   BSS1815 — QR CODE GENERATOR
   Fichye: qr-generator.js
   ============================================================ */

export function generateVendorQR(vendorID) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${vendorID}`;
}
