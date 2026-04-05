/* ============================================================
   BSS1815 — PHOTO AS ID ENGINE
   Fichye: photo-id.js
   ============================================================ */

import { storage } from "./firebase-config.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

/* ------------------------------------------------------------
   CAPTURE PHOTO FROM CAMERA
   ------------------------------------------------------------ */
export async function capturePhoto(videoElement) {
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElement, 0, 0);

  return await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg"));
}

/* ------------------------------------------------------------
   UPLOAD PHOTO TO FIREBASE
   ------------------------------------------------------------ */
export async function uploadPhotoAsID(blob, vendorID) {
  const storageRef = ref(storage, `vendors/${vendorID}.jpg`);
  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
}
