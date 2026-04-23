// FICHYE: /js/firebase-roles.js

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore();

/**
 * Mete SUPER_ADMIN ak ADMIN yo nan Firestore
 * Rele sa yon sèl fwa pou inisyalizasyon
 */
export async function initRoles() {
    await setDoc(doc(db, "roles", "super_admins"), {
        users: [
            "UID_MAX",
            "UID_CANGE"
        ]
    });

    await setDoc(doc(db, "roles", "admins"), {
        users: [
            "UID_ADMIN_1",
            "UID_ADMIN_2"
        ]
    });
}

/**
 * Retounen wòl yon itilizatè selon UID li
 */
export async function getUserRole(uid) {
    const superSnap = await getDoc(doc(db, "roles", "super_admins"));
    const adminSnap = await getDoc(doc(db, "roles", "admins"));

    const superAdmins = superSnap.exists() ? superSnap.data().users : [];
    const admins = adminSnap.exists() ? adminSnap.data().users : [];

    if (superAdmins.includes(uid)) return "SUPER_ADMIN";
    if (admins.includes(uid)) return "ADMIN";
    return "NONE";
}
