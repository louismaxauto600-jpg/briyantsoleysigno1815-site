// =====================================
//  FIREBASE RULES PRO‑MAX (FINAL)
// =====================================
//
//  FICHYE SA A:
//
//  - Pouse Firestore Rules PRO‑MAX
//  - Pouse Storage Rules PRO‑MAX
//  - Pwoteje SUPER ADMIN yo
//  - Bloke ADMIN kont done sansib
//  - Kreye estrikti sekirite final
//
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";

const firebaseConfig = {
  // mete config ou la
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// =====================================
//  RULES FIRESTORE PRO‑MAX
// =====================================
const FIRESTORE_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ============================
    //  SUPER ADMIN SECURITY
    // ============================
    function isSuperAdmin() {
      return request.auth.token.role == "superadmin";
    }

    function isAdmin() {
      return request.auth.token.role == "admin";
    }

    // ============================
    //  GLOBAL ACCESS
    // ============================
    match /branding/{doc} {
      allow read: if request.auth != null;
      allow write: if isSuperAdmin();
    }

    match /security/superadmins {
      allow read: if isSuperAdmin();
      allow write: if isSuperAdmin();
    }

    // ============================
    //  ADMINS COLLECTION
    // ============================
    match /admins/{uid} {
      allow read: if isAdmin() || isSuperAdmin();
      allow write: if isSuperAdmin();
      allow delete: if isSuperAdmin();
    }

    // ============================
    //  MUSICIANS COLLECTION
    // ============================
    match /musicians/{doc} {
      allow read: if request.auth != null;
      allow write: if isAdmin() || isSuperAdmin();
      allow delete: if isAdmin() || isSuperAdmin();
    }

    // ============================
    //  LEADERS COLLECTION
    // ============================
    match /leaders/{doc} {
      allow read: if request.auth != null;
      allow write: if isAdmin() || isSuperAdmin();
      allow delete: if isAdmin() || isSuperAdmin();
    }

    // ============================
    //  MESSAGES COLLECTION
    // ============================
    match /messages/{msg} {
      allow read, write: if request.auth != null
        && request.auth.uid in resource.data.participants;
    }
  }
}
`;

// =====================================
//  STORAGE RULES PRO‑MAX
// =====================================
const STORAGE_RULES = `
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    function isSuperAdmin() {
      return request.auth.token.role == "superadmin";
    }

    function isAdmin() {
      return request.auth.token.role == "admin";
    }

    // Branding (SUPER ADMIN ONLY)
    match /branding/{file} {
      allow read: if request.auth != null;
      allow write: if isSuperAdmin();
    }

    // Musicians photos
    match /musicians/{file} {
      allow read: if request.auth != null;
      allow write: if isAdmin() || isSuperAdmin();
    }

    // Leaders photos
    match /leaders/{file} {
      allow read: if request.auth != null;
      allow write: if isAdmin() || isSuperAdmin();
    }
  }
}
`;

// =====================================
//  PUSH RULES TO FIREBASE (CLOUD FUNCTION)
// =====================================
export async function pushFirestoreRules() {
  const push = httpsCallable(functions, "pushFirestoreRules");
  await push({ rules: FIRESTORE_RULES });
  alert("Firestore Rules PRO‑MAX pouse ak siksè.");
}

export async function pushStorageRules() {
  const push = httpsCallable(functions, "pushStorageRules");
  await push({ rules: STORAGE_RULES });
  alert("Storage Rules PRO‑MAX pouse ak siksè.");
}
