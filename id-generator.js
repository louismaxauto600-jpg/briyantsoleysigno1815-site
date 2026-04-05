/* ============================================================
   BSS1815 — AUTOMATIC ID GENERATOR
   Fichye: id-generator.js
   ============================================================ */

import { getLastVendorID, updateLastVendorID } from "./firebase-structure.js";

/* ------------------------------------------------------------
   GENERATE NEXT ID
   ------------------------------------------------------------ */
export async function generateNextVendorID() {
  const lastID = await getLastVendorID(); // eg: TM-2026-014

  const parts = lastID.split("-");
  const year = new Date().getFullYear(); // otomatik ane aktyèl
  let number = parseInt(parts[2]);

  number++;

  const newNumber = String(number).padStart(3, "0");
  const newID = `TM-${year}-${newNumber}`;

  await updateLastVendorID(newID);

  return newID;
}
